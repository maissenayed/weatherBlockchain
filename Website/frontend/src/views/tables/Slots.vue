<template>
  <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-title">
        <h3>Items And Headers</h3>
      </div>
      <div class="app-card-content">
        <v-data-table
          v-model="selected"
          v-bind:headers="headers"
          v-bind:items="items"
          select-all
          v-bind:pagination.sync="pagination"
          item-key="name">
          <template slot="headers" slot-scope="props">
            <tr>
              <th>
                <v-checkbox
                  primary
                  hide-details
                  @click.native="toggleAll"
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                ></v-checkbox>
              </th>
              <th v-for="header in props.headers" :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)">
                <v-icon>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox
                primary
                hide-details
                :input-value="props.selected"
                ></v-checkbox>
              </td>
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.sodium }}</td>
              <td class="text-xs-right">{{ props.item.calcium }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>
    <div class="app-card">
      <div class="app-card-title">
        <h3>Header Cell</h3>
      </div>
      <div class="app-card-content">
        <v-data-table
          v-bind:headers="headers"
          :items="items">
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.sodium }}</td>
            <td class="text-xs-right">{{ props.item.calcium }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </template>
        </v-data-table>
      </div>
    </div>
    <div class="app-card">
      <div class="app-card-title">
        <h3>Expand</h3>
      </div>
      <div class="app-card-content">
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          item-key="name">
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.sodium }}</td>
              <td class="text-xs-right">{{ props.item.calcium }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <v-card-text>Peek-a-boo!</v-card-text>
            </v-card>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>
<script>
  import tableData from '../../assets/tableData'

  export default {
    data () {
      return {
        items: tableData,
        pagination: {
          sortBy: 'name'
        },
        selected: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Sodium (mg)', value: 'sodium' },
          { text: 'Calcium (%)', value: 'calcium' },
          { text: 'Iron (%)', value: 'iron' }
        ]
      }
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.items.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>
