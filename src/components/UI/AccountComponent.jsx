export const AccountComponent = ({ handleOrderSubmit }) => {

  const orderSubmitHandler = (e) => {
    e.preventDefault()
    handleOrderSubmit()
  }

  return (
    <div className="col-lg-12">
      <div className="row gy-5 gy-md-6 justify-content-center">
        <div className="col-lg-6 col-xxl-12">
          <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp">
            <h3 className="p6-color mb-6 mb-md-8">Bank Details</h3>
            <form onSubmit={orderSubmitHandler}>
              <div className="contact_info__inpuarea mb-6 mb-md-8 bg1-color br2 rounded-20 p-3">
                <div className="contact_info__inpuarea-group gap-5 gap-md-6 mb-4 position-relative">
                  <label for="first-name" className="form-label text-white">
                    Account Holder Name
                  </label>
                  <input
                    className="bg4-color"
                    type="text"
                    Value="OTC Exchange"
                  />
                  <div className="tick-mark">
                    <i className="fa fa-copy text-white"></i>
                  </div>
                </div>
                <div className="contact_info__inpuarea-group gap-5 gap-md-6 mb-4 position-relative">
                  <label for="first-name" className="form-label text-white">
                    Bank Name
                  </label>
                  <input
                    className="bg4-color"
                    type="text"
                    Value="State Bank of India"
                  />
                  <div className="tick-mark">
                    <i className="fa fa-copy text-white"></i>
                  </div>
                </div>
                <div className="contact_info__inpuarea-group gap-5 gap-md-6 mb-4 position-relative">
                  <label for="first-name" className="form-label text-white">
                    Account Number
                  </label>
                  <input
                    className="bg4-color"
                    type="text"
                    Value="328923897329999e"
                  />
                  <div className="tick-mark">
                    <i className="fa fa-copy text-white"></i>
                  </div>
                </div>
                <div className="contact_info__inpuarea-group gap-5 gap-md-6 mb-4 position-relative">
                  <label for="first-name" className="form-label text-white">
                    Branch
                  </label>
                  <input className="bg4-color" type="text" Value="India" />
                  <div className="tick-mark">
                    <i className="fa fa-copy text-white"></i>
                  </div>
                </div>
                <div className="contact_info__inpuarea-group gap-5 gap-md-6 mb-4 position-relative">
                  <label for="first-name" className="form-label text-white">
                    IFSC
                  </label>
                  <input className="bg4-color" type="text" Value="SBI382237" />
                  <div className="tick-mark">
                    <i className="fa fa-copy text-white"></i>
                  </div>
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="roboto fw-bold cmn-btn px-5 px-md-6 py-3"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
