import InvoiceVoucher from "./InvoiceVoucher";
import { partyList } from "./VoucherParts";

function Purchase() {
    return (
        <InvoiceVoucher
            type="purchase"
            title="Purchase Voucher"
            subtitle="Record purchase transactions and supplier invoices"
            voucherNo="PV-0001"
            partyLabel="Supplier A/c"
            partyList={partyList}
        />
    );
}

export default Purchase;