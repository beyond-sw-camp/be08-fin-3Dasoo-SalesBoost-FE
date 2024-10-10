<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';

//Components
import BasicLayout from '@/components/forms/form-vertical/BasicLayout.vue';
import BasicWithIcons from '@/components/forms/form-vertical/BasicWithIcons.vue';
import FormSeprator from '@/components/forms/form-vertical/FormSeprator.vue';
import Collapsible from '@/components/forms/form-vertical/Collapsible.vue';
import PersonalInfoTab from '@/components/forms/form-vertical/PersonalInfoTab.vue';
import AccountDetailsTab from '@/components/forms/form-vertical/AccountDetailsTab.vue';
import SocialLinksTab from '@/components/forms/form-vertical/SocialLinksTab.vue';
import OutlinedButtons from '@/components/forms/form-elements/button/OutlinedButtons.vue';
import CustomerAddCard from '@/components/customer/CustomerAddCard.vue';
import InputForm from '@/components/customer/InputForm.vue';

/*tab*/
const tab = ref(null);

// theme breadcrumb
const page = ref({ title: '고객등록' });
// const breadcrumbs = ref([
//     {
//         text: 'Dashboard',
//         disabled: false,
//         href: '#'
//     },
//     {
//         text: 'Vertical Form',
//         disabled: true,
//         href: '#'
//     }
// ]);
</script>

<template>
   <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
   <v-row>
        
        <CustomerAddCard title="고객 등록">
             <InputForm/>
      
    
        </CustomerAddCard>        
                            
   </v-row>           
</template>
