<template>
    <div class="scroll">
      <table class="table table-dark">
        <thead>
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="`${header}${i}`"
            class="header-item"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entity in data"
          :key="`entity-${entity.name}`"
          class="table-rows"
        >
          <td
            v-for="(header, i) in headers"
            :key="`${header}-${i}`"
          >
            <slot :name="`column${i}`" :entity="entity"></slot>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </template>
  <style>
  .scroll {
    overflow-y:scroll;
    height: 35em;
  }
  th {
  position: sticky;
  text-align: center;
  top: 0.1px;
  background: #383f45;
}
td {
  text-align: center;
}
  </style>   
  <script>
  
  export default{
    name: 'Table',
    props: {
      headers: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
    },
  }
  </script>