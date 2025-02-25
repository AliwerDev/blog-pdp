import { get } from "lodash";
import { Event } from "pages/events-block/components/EventMainCard";

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
  public_url: string;
};

export function parseNotionResponse(response: any): BlogPost[] {
  return get(response, "results", []).map((page: any) => parseNotionPage(page));
}

export function parseNotionPage(page: any): BlogPost {
  return {
    id: get(page, "id", ""),
    public_url: get(page, "public_url", ""),
    author: {
      fullname: get(page, "properties.Author.people[0].name", "Unknown"),
      avatarUrl: get(page, "properties.Author.people[0].avatar_url", null),
    },
    title: get(page, "properties.Name.title[0].plain_text", "Untitled"),
    content: get(page, "properties.Content.rich_text[0].plain_text", ""),
    coverImageUrl: get(page, "properties.Featured Image.files[0].file.url", ""),
    tags: get(page, "properties.Tags.multi_select", []).map((tag: any) => tag.name),
    category: get(page, "properties.Categories.select.name", ""),
    date: get(page, "properties.Date.date.start", ""),
    url: get(page, "public_url", ""),
  };
}

export function parseEventsData(response: any): Event[] {
  return get(response, "results", []).map((page: any) => parseEventPage(page));
}

export function parseEventPage(page: any): Event {
  return {
    id: get(page, "id", ""),
    title: get(page, "properties.Title.title[0].plain_text", ""),
    description: get(page, "properties.Description.rich_text[0].plain_text", ""),
    date: get(page, "properties.Date.date.start", ""),
    location: get(page, "properties.Manzil.select.name", ""),
    capacity: parseInt(get(page, "properties.Capacity.rich_text[0].plain_text", "0"), 0),
    coverImage: get(page, "properties.Cover.files[0].file.url", ""),
    url: get(page, "properties.Link.rich_text[0].plain_text", ""),
  };
}
