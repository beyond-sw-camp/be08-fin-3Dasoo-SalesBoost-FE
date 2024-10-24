<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const dialog = ref(false)
const dialogDelete = ref(false)
const searchYear = ref('');
const searchSalesperson = ref('');
const headers = ref([
    { title: '제품명', align: 'start', sortable: false, key: 'name' },
    { title: '합계', key: 'total' },
    { title: '01', key: 'month01' },
    { title: '02', key: 'month02' },
    { title: '03', key: 'month03' },
    { title: '04', key: 'month04' },
    { title: '05', key: 'month05' },
    { title: '06', key: 'month06' },
    { title: '07', key: 'month07' },
    { title: '08', key: 'month08' },
    { title: '09', key: 'month09' },
    { title: '10', key: 'month10' },
    { title: '11', key: 'month11' },
    { title: '12', key: 'month12' },
    { title: 'Actions', key: 'actions', sortable: false },
])
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
    name: '',
    total: 0,
    month01: 0,
    month02: 0,
    month03: 0,
    month04: 0,
    month05: 0,
    month06: 0,
    month07: 0,
    month08: 0,
    month09: 0,
    month10: 0,
    month11: 0,
    month12: 0,
})
const defaultItem = ref({
    name: '',
    total: 0,
    month01: 0,
    month02: 0,
    month03: 0,
    month04: 0,
    month05: 0,
    month06: 0,
    month07: 0,
    month08: 0,
    month09: 0,
    month10: 0,
    month11: 0,
    month12: 0,
})
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})
function initialize() {
    desserts.value = [
        { name: '제품 A', total: 1000, month01: 100, month02: 200, month03: 300, month04: 400, month05: 500, month06: 600, month07: 700, month08: 800, month09: 900, month10: 1000, month11: 1100, month12: 1200 },
        { name: '제품 B', total: 2000, month01: 200, month02: 400, month03: 600, month04: 800, month05: 1000, month06: 1200, month07: 1400, month08: 1600, month09: 1800, month10: 2000, month11: 2200, month12: 2400 },
        // ... 추가 데이터
    ]
}
function editItem(item) {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}
function deleteItem(item) {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}
function deleteItemConfirm() {
    desserts.value.splice(editedIndex.value, 1)
    closeDelete()
}
function close() {
    dialog.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
    })
}
function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
    })
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value)
    } else {
        desserts.value.push(editedItem.value)
    }
    close()
}
watch(dialog, val => {
    val || close()
})
watch(dialogDelete, val => {
    val || closeDelete()
})
initialize()
</script>

<template>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Target sales management">
                <v-row class="mb-5">
                    <v-col cols="6" sm="4">
                        <v-text-field
                            v-model="searchYear"
                            append-inner-icon="mdi-calendar"
                            label="년도 검색"
                            single-line
                            hide-details
                        />
                    </v-col>
                    <v-col cols="6" sm="4">
                        <v-text-field
                            v-model="searchSalesperson"
                            append-inner-icon="mdi-account"
                            label="영업사원명 검색"
                            single-line
                            hide-details
                        />
                    </v-col>
                </v-row>

                <v-data-table class="border rounded-md" :headers="headers" :items="desserts">
                    <template v-slot:top>
                        <v-toolbar class="bg-lightsecondary" flat>
                            <v-toolbar-title>Target Sale</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" variant="flat" dark @click="dialog = true">Add New Item</v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon color="info" size="small" class="me-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon color="error" size="small" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>

                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title class="pa-4 bg-secondary">
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container class="px-0">
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="제품명"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.total" label="합계"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month01" label="01"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month02" label="02"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month03" label="03"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month04" label="04"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month05" label="05"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month06" label="06"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month07" label="07"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month08" label="08"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month09" label="09"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month10" label="10"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month11" label="11"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.month12" label="12"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
