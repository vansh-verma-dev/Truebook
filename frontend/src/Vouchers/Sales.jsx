import InvoiceVoucher from "./InvoiceVoucher";
import { partyList } from "./VoucherParts";

function Sales() {
    return (
        <InvoiceVoucher
            type="sales"
            title="Sales Voucher"
            subtitle="Record sales transactions and customer invoices"
            voucherNo="SV-0001"
            partyLabel="Party A/c"
            partyList={partyList}
        />
    );
}

export default Sales;