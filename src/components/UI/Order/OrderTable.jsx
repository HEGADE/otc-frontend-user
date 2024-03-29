export const OrderTable = ({ activeTransactionTypeTab, orderData }) => {
  return (
    <div class="tab-content">
      <div class="pools_table__totalitem overflow-auto">
        <table>
          <th>Order Name</th>
          <th>
            <div class="d-flex align-items-center gap-1">
              <span>Amount Sent</span>
              <div class="d-flex flex-column gap-0">
                <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
              </div>
            </div>
          </th>
          <th>
            <div class="d-flex align-items-center gap-1">
              <span>Amount Recieved</span>
              <div class="d-flex flex-column gap-0">
                <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
              </div>
            </div>
          </th>
          <th>Type</th>
          <th>Status</th>
          {orderData?.map((order) => {
            return (
              <tr key={orderData?.id}>
                <td>
                  <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/btc.png"
                        style={{ height: "30px" }}
                        alt="Icons"
                      />
                      <img
                        class="pools_table__totalitem-img"
                        src="assets/images/inr.png"
                        style={{ height: "30px" }}
                        alt="Icons"
                      />
                    </div>
                    <div class="d-flex flex-column">
                      <span class="roboto fw-bold">{order?.crypto}</span>
                      <span class="roboto">{order?.currency}</span>
                    </div>
                  </div>
                </td>
                <td>{order?.sendAmount}</td>
                <td>{order?.receivedAmount}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <span>
                      {activeTransactionTypeTab === "FIAT"
                        ? "Buy Order"
                        : "Sell Order"}
                    </span>
                  </div>
                </td>
                <td>
                  <a
                    class="cmn-btn py-2 px-6 px-md-8 p1-color"
                    href="javascript:void(0)"
                  >
                    {order.status}
                  </a>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
