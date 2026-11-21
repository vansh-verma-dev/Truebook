import CashBankVoucher from "./CashBankVoucher";
import { ledgerList, partyList } from "./VoucherParts";

function Recipt() {
    return (
        <CashBankVoucher
            type="receipt"
            title="Receipt Voucher"
            subtitle="Record money received through Cash or Bank accounts"
            voucherNo="RC-00001"
            accountLabel="Received In"
            accountSide="Dr"
            particularList={[...partyList, ...ledgerList]}
        />
    );
}

export default Recipt;