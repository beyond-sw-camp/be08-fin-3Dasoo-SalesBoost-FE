<script setup lang="ts">
import { ref , computed} from 'vue';
import axios from 'axios';
import { router } from '@/router';

const valid = ref(false);
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const deptName = ref('부서를 선택해주세요');
const depts = ref(['영업부','개발부','인사부','총무부','기획부','전산,IT부']);


const passwordRules = ref([
    (v: string) => !!v || '비밀번호를 입력해주세요',
    (v: string) => (v && v.length >= 4) || '비밀번호는 4자리 이상으로 입력해주세요'
]);

const confirmPasswordRules = ref([
    (v: string) => !!v || '비밀번호확인을 입력해주세요',
    (v: string) => (v===password.value) || '비밀번호를 다시 확인해주세요'
]);
const emailRules = ref([(v: string) => !!v || '이메일을 입력해주세요', (v: string) => /.+@.+\..+/.test(v) || '이메일 형식으로 입력해주세요']);
const name = ref('');
const nameRules = ref([
    (v: string) => !!v || '이름을 입력해주세요',
    (v: string) => (v && v.length <= 10) || '이름은 10글자 이하로 입력해주세요'
]);

const formIsValid = computed(()=>{// 계산된 속성 사용
    return email.value && name.value && password.value && confirmPassword.value && valid.value && (deptName.value !=="부서를 선택해주세요");

})
const signUp=()=>{
    if(formIsValid.value){
        signUpApi();
    }    
}

const signUpApi = async()=>{
    try{
        axios.post('http://localhost:8080/api/users/join',{
            name:name.value,
            email:email.value,
            deptName:deptName.value,
            password:password.value,

        }).then((res)=>{
            console.log(res);
            if(res.data.code==200){
                alert('정상적으로 회원가입이 완료되었습니다.');
                if(confirm(`사원번호가 발급되었습니다. : ${res.data.result.employeeId}`)){
                    router.push("/auth/login");
                }
          //   router.push("/auth/register/success");  
            }else{
                alert(res.data.message);
            }
        })
    }catch(err){
        console.log(err);
    }
}
</script>
<template>
    <div class="d-flex align-center text-center mb-2">
    </div>
    <v-form ref="form" v-model="valid"  class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">이름</v-label>
        <VTextField v-model="name" :rules="nameRules" required placeholder="이름을 입력해주세요" ></VTextField>
        <v-label class="mb-2 font-weight-medium">부서</v-label>
            <v-select
                v-model="deptName"
                :items="depts"
                placeholder="부서를 선택해주세요"  
                item-title="state"
                item-value="abbr"
                return-object
                single-line
                variant="outlined"
            ></v-select>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">이메일</v-label>
        <VTextField v-model="email" :rules="emailRules" required placeholder="이메일을 입력해주세요"></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">비밀번호</v-label>
        <VTextField
            v-model="password"
            :counter="10"
            placeholder="비밀번호를 입력해주세요"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">비밀번호 확인</v-label>
        <VTextField
            v-model="confirmPassword"
            :counter="10"
            placeholder="비밀번호를 입력해주세요"
            :rules="confirmPasswordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-btn size="large" :disabled="!formIsValid" class="mt-2 signup-btn" color="primary" block flat @click="signUp">회원가입</v-btn>
    </v-form>
</template>
