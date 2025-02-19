import { get } from "lodash";

export type BlogPost = {
  id: string;
  author: {
    fullname: string;
    avatarUrl: string | "";
  };
  title: string;
  content: string;
  coverImageUrl: string | "";
  tags: string[];
  category: string;
  date: string;
  url: string;
};

export function parseNotionResponse(response: any): BlogPost[] {
  return get(response, "results", []).map((page: any) => {
    const author = page.properties.Author.people[0] || {};
    return {
      id: page.id,
      author: {
        fullname: author.name || "Unknown",
        avatarUrl: author.avatar_url || null,
      },
      title: page.properties.Name.title[0]?.plain_text || "Untitled",
      content: page.properties.Content.rich_text[0]?.plain_text || "",
      coverImageUrl: page.properties["Featured Image"].files?.[0]?.file?.url || "",
      tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
      category: page.properties.Categories.select?.name || "",
      date: page.properties.Date.date?.start || "",
      url: page.public_url || "",
    };
  });
}
