<template>
  <v-container fluid grid-list-xl py-0>
    <div class="app-card">
      <div class="app-card-title">
        <h3>Search Row</h3>
      </div>
      <div class="app-card-content">
        <v-card-title>Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search">
          </v-text-field>
        </v-card-title>
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td>
              <v-edit-dialog lazy>
                {{ props.item.name }}
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="props.item.name"
                  single-line
                  counter
                  :rules="[max25chars]">
                </v-text-field>
              </v-edit-dialog>
            </td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.sodium }}</td>
            <td class="text-xs-right">{{ props.item.calcium }}</td>
            <td class="text-xs-right">
              <v-edit-dialog
                @open="tmp = props.item.iron"
                @save="props.item.iron = tmp || props.item.iron"
                large
                lazy>
                <div>{{ props.item.iron }}</div>
                <div slot="input" class="mt-3 title">Update Iron</div>
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="tmp"
                  single-line
                  counter
                  autofocus
                  :rules="[max25chars]">
                </v-text-field>
              </v-edit-dialog>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
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
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Sodium (mg)', value: 'sodium' },
          { text: 'Calcium (%)', value: 'calcium' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        items: tableData
      }
    }
  }
</script>
