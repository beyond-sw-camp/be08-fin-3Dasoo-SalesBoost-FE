<script setup lang="ts">
import { ref } from 'vue';
// common components

//Components
import CustomerAddCard from '@/components/customer/CustomerAddCard.vue';
import InputForm from '@/components/customer/InputForm.vue';

/*tab*/
const tab = ref(null);

const page = ref({ title: '고객 정보' });
</script>

<template>
   <v-row>
        
        <CustomerAddCard title="page">
             <InputForm/>
        </CustomerAddCard>        
                            
   </v-row>           
</template>
