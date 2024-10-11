<template>
    <div class="container">
        
        <div class="filter_container">
            <FilterCard/>
            
        </div>
    
        <div class="customer_container">
            <div class="header">
                <div class="result_count">(검색결과: X건)</div>   
                <v-btn variant="tonal" color="primary" to="/sales/customer-add">고객 추가</v-btn>
            </div>
         
            <hr  class="divider"></hr>
                <CustomerCard :customers="customers"/>
        </div>
    </div>
</template>

<script setup>
import CustomerCard from '@/components/customer/CustomerCard.vue';
import FilterCard from '@/components/customer/FilterCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const customers = ref([]);


onMounted(()=>{
    fetchCustomers();
})

const fetchCustomers=async()=>{

    try{

        axios.get('http://localhost:8080/api/customers'

        ).then((res)=>{
            console.log(res);
            if(res.data.code==200){
                console.log(res.data.result);
                customers.value = {...res.data.result};
                console.log(`ref 저장 값 :  ${JSON.stringify(res.data.result)}`);
            }
        })

    }catch(err){

        console.log(`[ERROR 몌세지] : ${err}`);

    }




}

</script>

<style lang="scss" scoped>
.header {
    font-size: 12px;
    margin:15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container {
   
    display: flex;
    flex-direction: row;
    // background-color: yellow;
}

.filter_container {
    background-color: white;
    margin-right: 30px;
    width: 25%;
}

.customer_container {
    background-color: white;
    width: 80%;
}
.divider{
    border-color:rgb(0, 110, 255);
    margin-left:15px;
    margin-right: 15px;
}

</style>