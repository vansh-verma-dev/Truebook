import CashBankVoucher from "./CashBankVoucher";

function Payment() {
    return (
        <CashBankVoucher
            type="payment"
            title="Payment Voucher"
            subtitle="Manage outgoing payments to suppliers, expenses & accounts"
            accountLabel="Paid From"
            accountSide="Cr"
        />
    );
}

export default Payment;