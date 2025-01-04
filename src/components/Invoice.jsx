import React, { useEffect } from "react";
import styles from "./Invoice.module.css"; // Import CSS module
import logo from "../assets/icon.png";

const Invoice = ({
  enrollmentId,
  studentName,
  address,
  paymentAmount,
  balanceAmount, 
  applicableFees,
  paymentMode,
  paymentId,
  notes,
  date,
  courses,
  duedate,
  // onPrint,
  onDownload,
  onEmail,
  email,
  setEmail,
  fullAddress
}) => {
  useEffect(() => {
    console.log("Invoice data:", {
      enrollmentId,
      studentName,
      address,
      paymentAmount,
      paymentMode,
      paymentId,
      notes,
      date,
      courses,
      duedate
    });
  }, [
    enrollmentId,
    studentName,
    address,
    paymentAmount,
    paymentMode,
    paymentId,
    notes,
    date,
    courses,
    duedate
  ]);


const printInvoice = () => {
  // Find the invoice content
  const invoiceElement = document.getElementById('receiptContainer');
  
  if (!invoiceElement) {
      console.error('Invoice content not found');
      return;
  }

  // Create a new window to hold the printable content
  const printWindow = window.open('', '', 'width=800,height=600');

  // Include the necessary CSS
  const stylesheets = Array.from(document.styleSheets)
      .map((sheet) => {
          try {
              return [...sheet.cssRules]
                  .map((rule) => rule.cssText)
                  .join('');
          } catch (e) {
              console.warn('Could not include stylesheet:', sheet.href);
              return '';
          }
      })
      .join('');

  // Inject the necessary HTML/CSS into the new window
  printWindow.document.write(`
      <html>
      <head>
          <title>Invoice</title>
          <style>
              ${stylesheets} /* Include styles from all styleSheets */
              @media print {
                  body, html {
                      margin: 0;
                      padding: 0;
                      width: 100%;
                      height: 100%;
                  }
                      
                  #receiptContainer {
                      width: 100%;
                      height: 100%;
                      page-break-inside: avoid;
                  }
                      .hr {
                        border-top: 1px solid black; /* Or use your specific style */
                        margin: 10px 0; /* Adjust margin as necessary */
                        width: 100%;
                    }
                }

                  /* Ensure it fits in one page */
                  @page {
                      size: A4;
                      margin: 0;
                  }

                  /* Ensure .hr div is included in print */
                  .hr {
                      border-top: 1px solid black; /* Or use your specific style */
                      margin: 10px 0; /* Adjust margin as necessary */
                      width: 100%;
                  }
              }
          </style>
      </head>
      <body>
          ${invoiceElement.outerHTML}
      </body>
      </html>
  `);

  printWindow.document.close();

  // Give the window some time to load the content before printing
  printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
  };
};
  return (
    <>
    <div id="receiptContainer" style={{padding:'10px 30px'}} className={styles.invoice}>
      <div className={styles["invoice-container"]}>
        <div className={styles["invoice-head"]}>

        <div
          className={styles.hr}
          style={{ borderTop: '1px solid black', margin: '0', width: '100%' }}
        ></div>

<div
  className={styles["invoice-head-container"]}
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "center", // Vertically aligns both logo and content
    // height: "100vh", // Full viewport height
    padding: "0 20px", // Optional padding for spacing
  }}
>
  {/* Logo on the left */}
  <div style={{ width: "150px" }}>
    <img src={logo} alt="Logo" style={{ width: "100%", marginBottom:"5px" }} />
    <span style={{ fontWeight: "" }}>Date : {date}</span>
  </div>

  {/* Centered Content */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: "2em",
        fontWeight: "bold",
        marginBottom: "5px",
      }}
    >
      YuvaTech Computers
    </div>
    <div
      style={{
        fontSize: "1em",
        marginBottom: "20px",
      }}
    >
      Office No.1, 2nd Floor, Opp. ST Stand,<br /> Anil coldrink, Kopargaon, Ahmednagar.<br />
      Mob.No: +91 9881199931    </div>
      

  </div>

</div>


<div
  className={styles.hr}
  style={{ borderTop: '1px solid black', margin: '10px 0', width: '100%' }}
></div>
          <div className={styles["invoice-head-bottom"]}>
            <div className={styles["invoice-head-bottom-left"]}>
              
                <span className={styles["text-bold"]}>Invoiced To:</span>  {studentName} , {address}
              
            </div>
          </div>
        </div>
        <div
  className={styles.hr}
  style={{ borderTop: '1px solid grey', margin: '10px 0', width: '100%' }}
></div>

        <div className={styles["overflow-view"]}>
          <div className={styles["invoice-body"]}>
            <table>
              <thead>
                <tr>
                  <td className={styles["text-bold"]}>Course</td>
                  <td className={styles["text-bold"]}>Payment Mode</td>
                  <td className={styles["text-bold"]}>Description</td>
                  {/* <td className={styles['text-bold']}>QTY</td> */}
                  <td className={styles["text-bold"]}>Amount</td>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.name}</td>
                    <td>{paymentMode}</td>
                    <td>Fees Paid</td>
                    {/* <td>{course.qty}</td> */}
                    <td className={styles["text-end"]}>{paymentAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles["invoice-body-bottom"]}>
              <div
                className={`${styles["invoice-body-info-item"]} ${styles["border-bottom"]}`}
              >
                <div
                  className={`${styles["info-item-td"]} ${styles["text-end"]} ${styles["text-bold"]}`}
                >
                  Total :
                </div>
                <div
                  className={`${styles["info-item-td"]} ${styles["text-end"]}`}
                >
                  {paymentAmount}
                </div>
              </div>
              {/* <div className={`${styles['invoice-body-info-item']} ${styles['border-bottom']}`}>
                                <div className={`${styles['info-item-td']} ${styles['text-end']} ${styles['text-bold']}`}>Tax:</div>
                                <div className={`${styles['info-item-td']} ${styles['text-end']}`}>$215.00</div>
                            </div> */}
              <div
                style={{
                  display: "flex",
                  flexFlow:"column",
                  alignItems:"start",
                  width: "100%",
                  border: "1px solid black"
                }}
              >
                <div style={{ fontWeight: "bold", padding: "2px" }}>
                  Total Fees :{" "}
                  <span style={{ fontWeight: "normal" }}>{applicableFees} </span>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    padding: "2px",
                  }}
                >
                  Pending Fees :{" "}
                  <span style={{ fontWeight: "normal" }}>{balanceAmount}</span>
                </div>
                <div style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    padding: "2px",
                  }}>
                    Due Date :{" "}
                    <span style={{ fontWeight: "normal" }}>{new Date(duedate).toLocaleDateString("en-GB")}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["invoice-foot"]}>
          <p>
            <span className={`${styles["text-bold"]} ${styles["text-center"]}`}>
              NOTE:&nbsp;
            </span>
            Payment is non-refundable after 8 days from the date of payment.
          </p>

        </div>
      </div>
      
    </div>
    <div className={styles["invoice-btns"]}>
            <button
              type="button"
              className={styles["invoice-btn"]}
              onClick={printInvoice}
            >
              <span>
                <i className="fa-solid fa-print"></i>
              </span>
              <span>Print</span>
            </button>
           
          </div>
    </>
  );
};

export default Invoice;
