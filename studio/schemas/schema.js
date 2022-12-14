import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import banner from "./banner";
import landing from "./landing";
import project from "./project";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([banner, landing, project]),
});
