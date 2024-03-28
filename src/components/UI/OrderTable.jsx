export const OrderTable = ({ activeTransactionTypeTab, orderData }) => {
  if (orderData?.length == 0) {
    return (
      <div className="tab-content">
        <div className="pools_table__totalitem overflow-auto">
          <br />
          <br />
          <h6>ℹ️ No {activeTransactionTypeTab === "FIAT" ? 'buy' : 'sell'} orders found!</h6>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="pools_table__totalitem overflow-auto">
        <table>
          <th>Order Name</th>
          <th>
            <div className="d-flex align-items-center gap-1">
              <span>Amount Sent</span>
              <div className="d-flex flex-column gap-0">
                <i className="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                <i className="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
              </div>
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center gap-1">
              <span>Amount Recieved</span>
              <div className="d-flex flex-column gap-0">
                <i className="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                <i className="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
              </div>
            </div>
          </th>
          <th>Network</th>
          <th>Type</th>
          <th>Status</th>
          {orderData?.map((order) => {
            return (
              <tr key={orderData?.id}>
                <td>
                  <div className="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/btc.png"
                        style={{ height: "30px" }}
                        alt="Icons"
                      />
                      <img
                        className="pools_table__totalitem-img"
                        src="assets/images/inr.png"
                        style={{ height: "30px" }}
                        alt="Icons"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <span className="roboto fw-bold">{order?.crypto}</span>
                      <span className="roboto">{order?.currency}</span>
                    </div>
                  </div>
                </td>
                <td>{order?.sendAmount} {order?.currency}</td>
                <td>{order?.receivedAmount} {order?.crypto}</td>
                <td>{order?.network}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span>
                      {activeTransactionTypeTab === "FIAT"
                        ? "Buy Order"
                        : "Sell Order"}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    className="trk-btn trk-btn--border trk-btn--primary"
                    style={{ cursor: 'default' }}
                  >
                    {order.status}
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
