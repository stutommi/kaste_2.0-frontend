// Taken from Apollo:
// https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d
const fetch = require("node-fetch")
const { introspectionQuery } = require("graphql")
const fs = require("fs")

const makeSchema = () => {
  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: introspectionQuery })
  })
    .then(res => res.json())
    .then(res =>
      fs.writeFileSync("introspection-query.json", JSON.stringify(res.data, null, 2))
    )
}

makeSchema()