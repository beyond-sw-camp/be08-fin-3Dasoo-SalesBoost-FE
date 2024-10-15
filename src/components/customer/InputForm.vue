<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { mask } from 'maska';  

const userName = ref('');
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
const token = ref('');

const router = useRouter();

onMounted(()=>{
    userName.value = localStorage.getItem('loginUserName')||'';
    const storedToken = localStorage.getItem("accessToken")||'';
    if(storedToken){
        console.log(storedToken);
        token.value = String(storedToken);
        console.log(token.value);
    }
    
})

const registerCustomer = ()=>{
    registerAPI();
}
const registerAPI = async()=>{
    try{
        const res = await axios.post('http://localhost:8080/api/customers',{
            name:customerName.value,
            company:company.value?company.value:null,
            dept:dept.value? dept.value:null,
            position:dept.value?  position.value:null,
            phone:phone.value? phone.value:null,
            tel: tel.value?  tel.value:null,
            email:email.value ? email.value:null,
            grade:grade.value ? grade.value:null,
            keyman:keyman.value 
        },{
            headers: {
                    Authorization: `Bearer ${token.value}`, // token.value가 문자열로 제대로 들어가야 함
                },
        }
    
    
    )
        if(res.data.code==200){
            alert(res.data.result);
            router.push({
                name: "Customer"
            });
        }
            
    }catch(err){
        console.log(`[ERROR 몌세지] : ${err}`);

    }
}

const confirmName = ref([
    (s:string)=> !! s|| '고객명을 입력해주세요'
]);

// 휴대폰 번호
const confirmPhone = ref([
    (s:string) => !!s|| '휴대폰 번호를 입력해주세요'
])
// 등급
const confirmGrade = ref([
(v: string) => !!v || '등급을 선택해주세요'
]);


// 이메일
const confirmEmail = ref([(v: string) => !!v || '이메일을 입력해주세요', (v: string) => /.+@.+\..+/.test(v) || '이메일 형식으로 입력해주세요']);


const formIsValid = computed(()=>{
    return customerName.value && email.value && grade.value && phone.value;
})



</script>
<template>
    <v-row>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">고객명</v-label><span class="require">*</span>
            <v-text-field color="primary" v-model="customerName" variant="outlined" type="text" :rules="confirmName" required>
       
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">고객사</v-label>
            <v-text-field color="primary" v-model="company" variant="outlined" type="text"  hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">부서</v-label>
            <v-text-field color="primary" v-model="dept" variant="outlined" type="text"  hide-details>
       
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">직책</v-label>
            <v-text-field color="primary" v-model="position" variant="outlined" type="text"  hide-details>
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">휴대폰 번호</v-label><span class="require">*</span>
            <v-text-field v-maska="'###-####-####'"  color="primary" v-model="phone" variant="outlined" type="text" placeholder="-를 제외하고 입력해주세요" :rules="confirmPhone">
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">유선번호</v-label>
            <v-text-field v-maska="'##-###-####'"  color="primary" v-model="tel" variant="outlined" type="text" placeholder="-를 제외하고 입력해주세요" hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">이메일</v-label><span class="require">*</span>
            <v-text-field color="primary" v-model="email" variant="outlined" type="email" placeholder="john@gmail.com" required :rules="confirmEmail">
            </v-text-field>
        </v-col>

        <v-col cols="6">
            <v-label class="font-weight-medium mb-2">등급</v-label><span class="require">*</span>
            <v-select v-model="grade" :items="grades" single-line variant="outlined" :rules="confirmGrade"></v-select>
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
            <v-btn color="info" variant="outlined" to="/sales/contact">목록</v-btn>
            <v-btn color="primary" variant="outlined" @click="registerCustomer" :disabled="!formIsValid">고객 등록</v-btn>
    </div>   
</template>
<style scoped>
    .require{
        color: red;
    }
</style>