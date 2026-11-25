import CashBankVoucher from "./CashBankVoucher";

function Recipt() {
    return (
        <CashBankVoucher
            type="receipt"
            title="Receipt Voucher"
            subtitle="Record money received through Cash or Bank accounts"
            accountLabel="Received In"
            accountSide="Dr"
        />
    );
}

export default Recipt;