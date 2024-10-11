<script setup></script>

<template>
    <v-card class="border" elevation="0">
        <v-card-title>당월 매출 실적 (단위 : 천원)</v-card-title>
        <v-card-subtitle>
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="text-left">제품명</th>
                        <th class="text-left">매출목표</th>
                        <th class="text-left">매출 (공급가액)</th>
                        <th class="text-left">달성률</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>[샘플] 기본형</td>
                        <td>1,000</td>
                        <td>0</td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td>[샘플] 맞춤형</td>
                        <td>2,000</td>
                        <td>0</td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td>[샘플] 구축형</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0%</td>
                    </tr>
                    <tr>
                        <td>합계</td>
                        <td>3,000</td>
                        <td>0</td>
                        <td>0%</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card-subtitle>
    </v-card>
</template>
