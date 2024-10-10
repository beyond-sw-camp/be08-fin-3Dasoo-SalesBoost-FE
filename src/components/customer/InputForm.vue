<script setup lang="ts">
import { ref } from 'vue';
// icons
import { UserIcon, BuildingArchIcon, MailIcon, PhoneIcon, Message2Icon } from 'vue-tabler-icons';
const userName = ref('김은경');
const selectlng = ref('');
const grade = ref(['S등급', 'A등급','B등급','C등급','D등급']);
</script>
<template>
    <v-row>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">고객명</v-label>
            <v-text-field color="primary" variant="outlined" type="text" placeholder="John Deo" hide-details>
       
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">고객사</v-label>
            <v-text-field color="primary" variant="outlined" type="text" placeholder="ACME Inc." hide-details>
           
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">이메일</v-label>
            <v-text-field color="primary" variant="outlined" type="email" placeholder="john@gmail.com" hide-details>
                <!-- <template v-slot:prepend-inner>
                    <MailIcon stroke-width="1.5" size="22" class="text-medium-emphasis mr-3" />
                </template> -->
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">휴대폰 번호</v-label>
            <v-text-field color="primary" variant="outlined" type="text" placeholder="010-xxxx-xxxx" hide-details>
                <!-- <template v-slot:prepend-inner>
                    <PhoneIcon stroke-width="1.5" size="22" class="text-medium-emphasis mr-3" />
                </template> -->
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">유선번호</v-label>
            <v-text-field  color="primary" variant="outlined" type="text" placeholder="031-xxx-xxx" hide-details>
       
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">등급</v-label>
            <v-select v-model="selectlng" :items="grade" single-line variant="outlined" hide-details></v-select>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">키맨여부</v-label>
            <v-switch color="primary" :model-value="true" hide-details></v-switch>
            
      
        </v-col>
     
                 
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">담당자</v-label>
            <v-text-field disabled color="primary" variant="outlined" type="text"  hide-details v-model="userName">
        
            </v-text-field>
        </v-col>

    </v-row>
    <div class="d-flex gap-3 mt-5 justify-content flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"> 
            <v-btn color="primary" variant="outlined">등록</v-btn>
            <v-btn color="info" variant="outlined" to="/sales/customer">목록</v-btn>
    </div>   
</template>
