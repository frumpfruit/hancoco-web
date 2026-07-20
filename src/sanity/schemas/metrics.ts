import { defineField, defineType } from "sanity";

export default defineType({
  name: "metrics",
  title: "Metrics & Stats",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Metric Title",
      type: "string",
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
    }),
    defineField({
      name: "unit",
      title: "Unit / Suffix",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "At A Glance", value: "glance" },
          { title: "Manufacturing", value: "manufacturing" },
        ],
      },
    }),
  ],
});
