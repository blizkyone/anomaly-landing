export default {
  name: "landing",
  title: "Landing",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "principal",
      title: "Principal",
      type: "string",
    },
    {
      name: "direccion",
      title: "Direccion",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "telefono",
      title: "Telefono",
      type: "string",
    },
  ],
};
