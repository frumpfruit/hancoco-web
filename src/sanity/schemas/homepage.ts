import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage Setup",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
    }),
    defineField({
      name: "announcementText",
      title: "Announcement Bar Text",
      type: "string",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),
  ],
});
