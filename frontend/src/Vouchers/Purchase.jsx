import InvoiceVoucher from "./InvoiceVoucher";

function Purchase() {
    return (
        <InvoiceVoucher
            type="purchase"
            title="Purchase Voucher"
            subtitle="Record purchase transactions and supplier invoices"
            partyLabel="Supplier A/c"
            partyGroup="sundryCreditor"
        />
    );
}

export default Purchase;