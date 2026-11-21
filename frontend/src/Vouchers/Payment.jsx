import CashBankVoucher from "./CashBankVoucher";
import { ledgerList, partyList } from "./VoucherParts";

function Payment() {
    return (
        <CashBankVoucher
            type="payment"
            title="Payment Voucher"
            subtitle="Manage outgoing payments to suppliers, expenses & accounts"
            voucherNo="PY-00001"
            accountLabel="Paid From"
            accountSide="Cr"
            particularList={[...ledgerList, ...partyList]}
        />
    );
}

export default Payment;