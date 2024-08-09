import vouchersAPI from "../../apis/couponsAPI";

const fetchVoucherByCode = async (voucherCode) => {
  const { useGetVoucherByCodeQuery } = vouchersAPI;
  const voucher = await useGetVoucherByCodeQuery(voucherCode).unwrap();
  return voucher;
};

export default fetchVoucherByCode;
