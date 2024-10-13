<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
// icons
const userName = ref('김은경');
const grades = ref(['S등급', 'A등급','B등급','C등급','D등급']);
const customerName = ref('');
const email = ref('');
const company = ref('');
const dept  = ref('');
const position = ref('');
const phone = ref('');
const tel = ref('');
const grade = ref('');
const keyman = ref(false);

const router = useRouter();

const registerCustomer = ()=>{

    registerAPI();
}
const registerAPI = async()=>{
    try{
        axios.post('http://localhost:8080/api/customers',{
            name:customerName.value,
            company:company.value?company.value:null,
            dept:dept.value? dept.value:null,
            position:dept.value?  position.value:null,
            phone:phone.value? phone.value:null,
            tel: tel.value?  tel.value:null,
            email:email.value ? email.value:null,
            grade:grade.value ? grade.value:null,
            keyman:keyman.value,


        }).then((res)=>{
            console.log(res);
            if(res.data.code==200){
                alert(res.data.result);
                router.push("/sales/contact");
            }
        })
    }catch(err){
        console.log(`[ERROR 몌세지] : ${err}`);

    }
}

</script>
<template>
    <v-row>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">고객명</v-label><span class="require">*</span>
            <v-text-field color="primary" v-model="customerName" variant="outlined" type="text" placeholder="John Deo" hide-details>
       
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">고객사</v-label>
            <v-text-field color="primary" v-model="company" variant="outlined" type="text" placeholder="ACME Inc." hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">부서</v-label>
            <v-text-field color="primary" v-model="dept" variant="outlined" type="text" placeholder="게임 개발부" hide-details>
       
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">직책</v-label>
            <v-text-field color="primary" v-model="position" variant="outlined" type="text" placeholder="대리" hide-details>
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">휴대폰 번호</v-label><span class="require">*</span>
            <v-text-field color="primary" v-model="phone" variant="outlined" type="text" placeholder="010-xxxx-xxxx" hide-details>
                <!-- <template v-slot:prepend-inner>
                    <PhoneIcon stroke-width="1.5" size="22" class="text-medium-emphasis mr-3" />
                </template> -->
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">유선번호</v-label>
            <v-text-field  color="primary" v-model="tel" variant="outlined" type="text" placeholder="031-xxx-xxx" hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">이메일</v-label><span class="require">*</span>
            <v-text-field color="primary" v-model="email" variant="outlined" type="email" placeholder="john@gmail.com" hide-details>
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">등급</v-label>
            <v-select v-model="grade" :items="grades" single-line variant="outlined" hide-details></v-select>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">키맨여부</v-label>
            <v-switch color="primary" :model-value="keyman" hide-details></v-switch>
            
      
        </v-col>
     
                 
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">담당자</v-label>
            <v-text-field disabled color="primary" variant="outlined" type="text"  hide-details v-model="userName">
        
            </v-text-field>
        </v-col>

    </v-row>
    <div class="d-flex gap-3 mt-5 justify-content flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"> 
            <v-btn color="primary" variant="outlined"  @click="registerCustomer">등록</v-btn>
            <v-btn color="info" variant="outlined" to="/sales/contact">목록</v-btn>
    </div>   
</template>
<style scoped>
    .require{
        color: red;
    }
</style>