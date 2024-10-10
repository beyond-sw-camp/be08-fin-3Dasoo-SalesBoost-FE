<script setup>
import {profileCards, socialiconCard} from '@/_mockApis/components/widget/card';
</script>

<template>
       <v-col cols="12">
        <v-row class="pt-3">
        <v-col cols="6" md="6" v-for="card in profileCards" :key="card.title" class="column">
            <v-card elevation="10" class="card text-center" rounded="md" >
                <v-card-item class="card_conatiner">
                    <div class="title_container">
                        <v-avatar size="60" rounded="xl">    
                        <img :src="card.avatar" :alt="card.avatar" width="60"/>
                        </v-avatar>
                        <div class="name_container">
                            <div class="customer_name">[샘플]삼다수</div> <div class="customer_position">( 영업부 /대리 )</div>
                        </div>
                    </div>

                    <div class="mt-4 info_container">
                        
                      <div>
                        Company.
                      </div>
                      <div>
                        0건
                      </div>
                    </div>
            
                </v-card-item>
                <v-divider class="mt-1"></v-divider>
                <div class="bottom_container">
                    <div>john@gmail.com </div>
                    <div>010-1234-5678 </div>
                    <div>070-3322-1234</div>
                </div>
            </v-card>
        </v-col>
     </v-row>
        </v-col>
</template>

<style lang="scss">

.card_conatiner{
    display: flex;
    padding:20px 20px 20px 20px;

}
.title_container {
    display: flex;
    flex-direction: row;
}
.info_container {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // background-color: rgb(106, 106, 202);

}
.name_container {
    margin-left: 4px;
    display: flex;
    flex-direction: row;
    // background-color: yellow;
    align-items: center;
}

.customer_name {
    font-size: 16px;
    font-weight: 600;
}
.customer_position {
    font-size: 12px;
}

.bottom_container {
    padding:10px;
    background-color: rgb(228, 225, 225);
    font-size: 12px;
    display: flex;
    justify-content: center;
    color: #1a1818;

    div {
        padding-right:5px
    }
}
</style>
