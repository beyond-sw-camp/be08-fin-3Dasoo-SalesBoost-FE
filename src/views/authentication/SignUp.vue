<script setup lang="ts">
/* SignUpForm form */
import SignUpForm from '@/components/auth/SignUpForm.vue';
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="min-vh-100 d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0  mx-auto" max-width="450">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4 mb-3">
                                <span class="bg-surface px-5 py-3 position-relative">SalesBoost 회원가입</span>
                            </div>                
                            <SignUpForm />
                            <h6 class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3">
                                 계정이 있는경우
                                <v-btn variant="plain" to="/auth/login" class="text-primary text-body-1 opacity-1 pl-2">로그인</v-btn>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>

</style>
