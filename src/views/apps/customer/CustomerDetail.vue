<script setup lang="ts">
import { ref } from 'vue';
// common components

//Components
import CustomerAddCard from '@/components/customer/CustomerAddCard.vue';
import UpdateForm from '@/components/customer/UpdateForm.vue';

/*tab*/
const tab = ref(null);

const page = ref({ title: '고객 정보' });
</script>

<template>
   <v-row>
        
        <CustomerAddCard :title=page.title>
             <UpdateForm/>
        </CustomerAddCard>        
                            
   </v-row>           
</template>
