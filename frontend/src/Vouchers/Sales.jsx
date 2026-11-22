import InvoiceVoucher from "./InvoiceVoucher";

function Sales() {
    return (
        <InvoiceVoucher
            type="sales"
            title="Sales Voucher"
            subtitle="Record sales transactions and customer invoices"
            partyLabel="Party A/c"
            partyGroup="sundryDebtor"
        />
    );
}

export default Sales;