<template>
  <v-dialog v-model="isOpen" @close="handleClose" max-width="600px">
    <v-card>
      <v-card-title>
        <span>{{ sale.salesNo ? '매출 수정' : '매출 추가' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="sale.salesCls" label="매출 구분" required />
          <v-text-field v-model="sale.salesDate" label="매출일" type="date" required />
          <v-text-field v-model="sale.taxCls" label="과세 구분" />
          <v-text-field v-model="sale.surtaxYn" label="추가 세금 여부 (Y/N)" maxlength="1" />
          <v-text-field v-model="sale.supplyPrice" label="공급가액" type="number" @input="calculateTaxAndPrice" />
          <v-text-field v-model="sale.tax" label="세액" type="number" readonly />
          <v-text-field v-model="sale.productCount" label="수량" type="number" />
          <v-text-field v-model="sale.price" label="총 가격" type="number" readonly />
          <v-text-field v-model="sale.expArrivalDate" label="입고예정일" type="date" />
          <v-text-field v-model="sale.busiType" label="사업 유형" />
          <v-text-field v-model="sale.busiTypeDetail" label="사업 유형 상세" />
          <v-textarea v-model="sale.note" label="비고" />
          <v-text-field v-model="sale.contractNo" label="계약번호" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="saveSale">저장</v-btn>
        <v-btn @click="handleClose">취소</v-btn>
        <v-btn color="red" @click="deleteSale" v-if="sale.salesNo">삭제</v-btn> 
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    value: Boolean,
    sale: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      valid: false,
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    // supplyPrice, productCount, surtaxYn이 변경될 때마다 계산 실행
    'sale.supplyPrice': 'calculateTaxAndPrice',
    'sale.productCount': 'calculateTaxAndPrice',
    'sale.surtaxYn': 'calculateTaxAndPrice',
  },
  methods: {
    saveSale() {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.sale);
        this.handleClose();
      }
    },
    handleClose() {
      this.isOpen = false;
      this.$emit('close');
    },
    async deleteSale() {
      if (confirm('정말로 이 매출을 삭제하시겠습니까?')) {
        try {
          await axios.delete(`http://localhost:8080/api/sales/${this.sale.salesNo}`);
          this.$emit('deleted', this.sale.salesNo); 
          this.handleClose();
        } catch (error) {
          console.error('매출 삭제에 실패했습니다:', error);
          alert('매출 삭제에 실패했습니다.');
        }
      }
    },
    calculateTaxAndPrice() {
      const supplyPrice = parseFloat(this.sale.supplyPrice) || 0;
      const productCount = parseInt(this.sale.productCount) || 0;
      const surtaxYn = this.sale.surtaxYn ? this.sale.surtaxYn.toUpperCase() : 'N'; 

      this.sale.tax = 0;
      this.sale.price = 0;

      console.log('Supply Price:', supplyPrice);
      console.log('Product Count:', productCount);
      console.log('Surtax:', surtaxYn);

      if (surtaxYn === 'Y') {
        this.sale.tax = supplyPrice * 0.1; 
        this.sale.price = (supplyPrice + this.sale.tax) * productCount; 
      } else {
        this.sale.price = supplyPrice * productCount; 
      }
      console.log('Tax:', this.sale.tax);
      console.log('Price:', this.sale.price);
    },
  },
};
</script>
