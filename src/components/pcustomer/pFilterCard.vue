<template>
    <div>
        <v-row class="select_row">
            <h1 class="title">검색조건</h1>
            <v-col cols="12" class="select_col">
                <v-select v-model="selectedItem" :items="items" single-line variant="outlined" hide-details placeholder="검색조건"></v-select>
            </v-col>

            <v-col cols=12>
                <v-text-field v-model="searchQuery" color="primary" variant="outlined" type="text" placeholder="검색어" hide-details>   
                </v-text-field>
            </v-col>

            <v-col cols="12">
                <v-select v-model="selectedContact" :items="selectContact" single-line variant="outlined" hide-details></v-select>
            </v-col>

            <v-col cols="12">
                <v-btn class="search_btn" variant="flat" color="primary" @click="search">검색</v-btn>
            </v-col>
            
        </v-row>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const emit = defineEmits(['search'])
const selectedItem = ref();
const searchQuery = ref(null); // 검색어
const selectedContact = ref("전체"); // 접촉 상태
const selectContact = ['미접촉','접촉시도','접촉중','접촉금지','고객전환']; 
const items = ['전체','고객사명','고객명','전화번호','메일']

const search = ()=>{
    // todo : 검색 조건 초기화
    console.log('클릭')
    if(selectedItem.value==null || searchQuery.value==null){
        alert("검색조건과 검색어를 입력해주세요");
        return;
    }
    emit('search',{
        selectedItem:selectedItem.value?selectedItem.value:null,  // 검색조건
        searchQuery:searchQuery.value?searchQuery.value:null, // 검색어
        selectedContact:selectedContact.value?selectedContact.value:null, // 접촉상태
    });

}

</script>

<style lang="scss" scoped>

.title{
    margin-top: 30px;
    margin-left: 12px;
    font-size: 16px;
}

.select_row {
    margin-left: 4px;
    margin-right:4px;
}

.search_btn {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
}

</style>