/* eslint-disable import/no-anonymous-default-export */
const CACHE_TTL = 300; // 5 daqiqa (300 soniya)
const CACHE_NAMESPACE = "notion_cache"; // Cloudflare KV yoki Worker global cache

export default {
  async fetch(request, _env) {
    const url = new URL(request.url);
    const pageId = url.searchParams.get("page_id");

    if (!pageId) {
      return new Response(JSON.stringify({ error: "Page ID berilmagan" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const cacheKey = `${CACHE_NAMESPACE}:${pageId}`;
    const cache = caches.default; // Cloudflare Worker global cache

    try {
      // 🔹 1️⃣ Avval cache-dan ma'lumotni olishga harakat qilamiz
      let cachedResponse = await cache.match(request);
      if (cachedResponse) {
        console.log("✅ Cache-dan olinmoqda:", pageId);
        return cachedResponse;
      }

      console.log("⚡ Cache topilmadi, Notion API ga so‘rov yuborilmoqda:", pageId);

      const NOTION_API_KEY = "your_notion_api_key"; // 🔥 O'zingizning Notion API kalitingizni qo'ying

      // 🔹 2️⃣ Notion API orqali sahifa ma'lumotlarini olish
      const pageResponse = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      });

      if (!pageResponse.ok) {
        return new Response(JSON.stringify({ error: "Sahifa topilmadi yoki API xatosi" }), {
          headers: { "Content-Type": "application/json" },
          status: pageResponse.status,
        });
      }

      const pageData = await pageResponse.json();

      // 🔹 3️⃣ Notion API orqali sahifadagi bloklarni olish
      const blocksResponse = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      });

      if (!blocksResponse.ok) {
        return new Response(JSON.stringify({ error: "Bloklar topilmadi yoki API xatosi" }), {
          headers: { "Content-Type": "application/json" },
          status: blocksResponse.status,
        });
      }

      const blocksData = await blocksResponse.json();

      // 🔹 4️⃣ Sahifa va bloklarni birlashtirish
      const mergedData = {
        page: pageData,
        blocks: blocksData.results, // Faqat bloklar ro‘yxatini qaytarish
      };

      // 🔹 5️⃣ Cache-ga saqlash (5 daqiqa davomida)
      const response = new Response(JSON.stringify(mergedData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // CORS muammosini hal qiladi
          "Cache-Control": `public, max-age=${CACHE_TTL}`, // 5 daqiqaga cache qiladi
        },
      });

      cache.put(request, response.clone()); // Cache-ga saqlash
      return response;
    } catch (error) {
      return new Response(JSON.stringify({ error: "Xatolik yuz berdi", details: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  },
};
