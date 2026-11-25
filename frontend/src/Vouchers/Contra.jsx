import CashBankVoucher from "./CashBankVoucher";

function Contra() {
    return (
        <CashBankVoucher
            type="contra"
            title="Contra Voucher"
            subtitle="Transfer funds between Cash & Bank accounts"
            accountLabel="From Account"
            accountSide="Cr"
            onlyCashBank
        />
    );
}

export default Contra;