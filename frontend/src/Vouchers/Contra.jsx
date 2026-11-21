import CashBankVoucher from "./CashBankVoucher";
import { cashBankList } from "./VoucherParts";

function Contra() {
    return (
        <CashBankVoucher
            type="contra"
            title="Contra Voucher"
            subtitle="Transfer funds between Cash & Bank accounts"
            voucherNo="CV-00001"
            accountLabel="From Account"
            accountSide="Cr"
            particularList={cashBankList}
        />
    );
}

export default Contra;