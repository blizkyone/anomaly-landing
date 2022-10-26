import { useEffect } from "react";
import { client } from "../lib/client";
import Carousel from "../components/Carousel";

const Proyecto = ({ project }) => {
  return (
    <div className="h-screen">
      <Carousel images={project.image} />
    </div>
  );
};

export default Proyecto;

export async function getStaticPaths() {
  const query = `*[_type == "project"] {
    slug {
      current
    }
  }`;

  const projects = await client.fetch(query);

  const paths = projects.map((project) => ({
    params: {
      proyecto: project.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking", // false or 'blocking'
  };
}

//use getStaticProps to get access to the url parameters i guess
export async function getStaticProps({ params: { proyecto } }) {
  const query = `*[_type == "project" && slug.current == "${proyecto}"][0]`;
  const project = await client.fetch(query);

  // const productQuery = '*[_type == "product"]';
  // const products = await client.fetch(productQuery);

  return {
    props: { project }, // will be passed to the page component as props
  };
}
