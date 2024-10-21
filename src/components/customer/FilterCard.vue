<template>
    <div>
        <v-row class="select_row">
            <h1 class="title">검색조건</h1>
            <v-col cols="12" class="select_col">
                <v-select v-model="selectedItem" :items="items" single-line variant="outlined" hide-details placeholder="검색조건"></v-select>
                    <!-- <v-combobox class="combo" v-model="select" :items="items" hide-details label="조건선택" multiple chips></v-combobox> -->
            </v-col>

            <v-col cols=12>
                <v-text-field color="primary" variant="outlined" type="text" placeholder="검색어" hide-details>   
                </v-text-field>
            </v-col>

            <v-col cols="12">
                <v-select v-model="selectedKey" :items="selectKey" single-line variant="outlined" hide-details></v-select>
            </v-col>

            <v-col cols=12>
                <v-text-field color="primary" variant="outlined" type="text" placeholder="담당자" hide-details>   
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-btn class="search_btn" variant="flat" color="primary" @click="search">검색</v-btn>
            </v-col>
            
        </v-row>
    </div>
</template>

<script setup>
import api from '@/api/axiosinterceptor';
import {ref, watch} from 'vue';

const selectedItem = ref();
const searchQuery = ref(''); // 검색어
const personInCharge = ref(''); // 담당자
const selectedKey = ref(["전체"]); // 키맨 여부 선택
const selectKey = ['전체','키맨','키맨아님'];

const items = [
  '고객사명',
  '고객명',
  '전화번호',
  '메일'
]

// watch(select,(newValue)=> {
//     if (newValue.includes('전체') && newValue.length !== items.length) {
//     // '전체'가 선택되면 모든 항목 선택
//     select.value = [...items];
//   } else if (!newValue.includes('전체')) {
//     // '전체'가 해제되면 초기화
//     select.value = newValue.filter((item) => item !== '전체');
//   }

//     console.log(`선택값 변경 : ${select.value}`)
// })

const search = ()=>{

    sendQueryAPI();

}

const sendQueryAPI = async()=>{
    try{
        const response = await api.post('/customer')

    }catch(err){
        console.log(`[ERROR 몌세지] : ${err}`);
    }
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
}

</style>