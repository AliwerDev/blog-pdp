import { get } from "lodash";
import { BlogPost } from "pages/home/components/blog-card/BlogCard";

export function parseNotionResponse(response: any): BlogPost[] {
  return get(response, "results", []).map((page: any) => {
    const author = page.properties.Author.people[0] || {};
    return {
      id: page.id,
      author: {
        fullname: author.name || "Unknown",
        avatarUrl: author.avatar_url || "",
      },
      title: page.properties.title.title[0]?.plain_text || "Untitled",
      content: page.properties.Content.rich_text[0]?.plain_text || "",
      coverImageUrl: page.properties.cover.files?.[0]?.file?.url || "",
      tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
      date: page.properties["Created time"].created_time || "",
    };
  });

  // return response?.map((page: any) => {
  //   return {
  //     author: {
  //       fullname: page.Author || "Unknown",
  //     },
  //     title: page.title || "Untitled",
  //     content: page.Content || "",
  //     coverImageUrl: page.cover || "",
  //     tags: page.Tags || "",
  //     date: page["Created time"] || "",
  //   };
  // });
}
