// // Invoice.jsx

// import React from 'react';
// import styles from './Invoice.module.css'; // Import CSS module
// import logo from '../assets/icon.png'

// const Invoice = () => {
//     const printInvoice = () => {
//         window.print();
//     };

//     return (
//             <div className={styles.invoice}>
//                 <div className={styles['invoice-container']}>
//                     <div className={styles['invoice-head']}>
//                         {/* <div className={styles['invoice-head-top']}>

//                             <div className={`${styles['invoice-head-top-right']} ${styles['text-end']}`}>
//                                 <h3>Invoice</h3>
//                             </div>
//                         </div> */}
//                         <div className={styles.hr}></div>
//                         <div className={styles['invoice-head-middle']}>
//                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//     <div style={{ width: '200px' }}>
//         <img src={logo} alt="Logo" style={{ width: '100%' }} />
//     </div>
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px', flexGrow: 1 }}>
//         <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Yuvatech Computers</div>
//         <div style={{ marginTop: '5px' }}>
//             <p><span style={{ fontWeight: 'bold' }}>Date</span>: 05/12/2020</p>
//             <p><span style={{ fontWeight: 'bold' }}>Invoice No:</span> 16789</p>
//         </div>
//     </div>
// </div>

//                         {/* <div className={`${styles['invoice-head-top-left']} ${styles['text-start']}`} style={{ width: '200px' }}>
//     <img src={logo} alt="Logo" />
// </div>

//                             <div className={`${styles['invoice-head-middle-left']} ${styles['text-start']}`}>
//                             <h2>Yuvatech Computers</h2>

//                                 <p><span className={styles['text-bold']}>Date</span>: 05/12/2020</p>
//                                 <p><span className={styles['text-bold']}>Invoice No:</span>16789</p>

//                             </div>
//                             {/*[] <div className={`${styles['invoice-head-middle-right']} ${styles['text-end']}`}>
//                                 <p><span className={styles['text-bold']}>Invoice No:</span>16789</p>
//                             </div> */}
//                         </div>
//                         <div className={styles.hr}></div>
//                         <div className={styles['invoice-head-bottom']}>
//                             <div className={styles['invoice-head-bottom-left']}>
//                                 <ul>
//                                     <li className={styles['text-bold']}>Invoiced To:</li>
//                                     <li>Smith Rhodes</li>
//                                     <li>15 Hodges Mews, High Wycombe</li>
//                                     <li>HP12 3JL</li>
//                                     <li>United Kingdom</li>
//                                 </ul>
//                             </div>
//                             <div className={styles['invoice-head-bottom-right']}>
//                                 <ul className={styles['text-end']}>
//                                     <li className={styles['text-bold']}>Pay To:</li>
//                                     <li>Koice Inc.</li>
//                                     <li>2705 N. Enterprise</li>
//                                     <li>Orange, CA 89438</li>
//                                     <li>contact@koiceinc.com</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles['overflow-view']}>
//                         <div className={styles['invoice-body']}>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <td className={styles['text-bold']}>Service</td>
//                                         <td className={styles['text-bold']}>Description</td>
//                                         <td className={styles['text-bold']}>Rate</td>
//                                         <td className={styles['text-bold']}>QTY</td>
//                                         <td className={styles['text-bold']}>Amount</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>Design</td>
//                                         <td>Creating a website design</td>
//                                         <td>$50.00</td>
//                                         <td>10</td>
//                                         <td className={styles['text-end']}>$500.00</td>
//                                     </tr>
//                                     <tr>
//                                         <td>Development</td>
//                                         <td>Website Development</td>
//                                         <td>$50.00</td>
//                                         <td>10</td>
//                                         <td className={styles['text-end']}>$500.00</td>
//                                     </tr>
//                                     <tr>
//                                         <td>SEO</td>
//                                         <td>Optimize the site for search engines (SEO)</td>
//                                         <td>$50.00</td>
//                                         <td>10</td>
//                                         <td className={styles['text-end']}>$500.00</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <div className={styles['invoice-body-bottom']}>
//                                 <div className={`${styles['invoice-body-info-item']} ${styles['border-bottom']}`}>
//                                     <div className={`${styles['info-item-td']} ${styles['text-end']} ${styles['text-bold']}`}>Sub Total:</div>
//                                     <div className={`${styles['info-item-td']} ${styles['text-end']}`}>$2150.00</div>
//                                 </div>
//                                 <div className={`${styles['invoice-body-info-item']} ${styles['border-bottom']}`}>
//                                     <div className={`${styles['info-item-td']} ${styles['text-end']} ${styles['text-bold']}`}>Tax:</div>
//                                     <div className={`${styles['info-item-td']} ${styles['text-end']}`}>$215.00</div>
//                                 </div>
//                                 <div className={styles['invoice-body-info-item']}>
//                                     <div className={`${styles['info-item-td']} ${styles['text-end']} ${styles['text-bold']}`}>Total:</div>
//                                     <div className={`${styles['info-item-td']} ${styles['text-end']}`}>$21365.00</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles['invoice-foot']}>

//                         <p><span className={`${styles['text-bold']} ${styles['text-center']}`}>NOTE:&nbsp;</span>This is computer generated receipt and does not require physical signature.</p>

//                         <div className={styles['invoice-btns']}>
//                             <button type="button" className={styles['invoice-btn']} onClick={printInvoice}>
//                                 <span>
//                                     <i className="fa-solid fa-print"></i>
//                                 </span>
//                                 <span>Print</span>
//                             </button>
//                             <button type="button" className={styles['invoice-btn']}>
//                                 <span>
//                                     <i className="fa-solid fa-download"></i>
//                                 </span>
//                                 <span>Download</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     );
// };

// export default Invoice;

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
  // onPrint,
  onDownload,
  onEmail,
  email,
  setEmail,
  fullAddress,
  duedate
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
      duedate,
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


//   const printInvoice = () => {
//     // Find the invoice content
//     const invoiceElement = document.getElementById('receiptContainer');
    
//     if (!invoiceElement) {
//         console.error('Invoice content not found');
//         return;
//     }

//     // Create a new window to hold the printable content
//     const printWindow = window.open('', '', 'width=800,height=600');

//     // Include the necessary CSS
//     const stylesheets = Array.from(document.styleSheets)
//         .map((sheet) => {
//             try {
//                 return [...sheet.cssRules]
//                     .map((rule) => rule.cssText)
//                     .join('');
//             } catch (e) {
//                 console.warn('Could not include stylesheet:', sheet.href);
//                 return '';
//             }
//         })
//         .join('');

//     // Inject the necessary HTML/CSS into the new window
//     printWindow.document.write(`
//         <html>
//         <head>
//             <title>Invoice</title>
//             <style>
//                 ${stylesheets} /* Include styles from all styleSheets */
//             </style>
//         </head>
//         <body>
//             ${invoiceElement.outerHTML}
//         </body>
//         </html>
//     `);

//     printWindow.document.close();

//     // Give the window some time to load the content before printing
//     printWindow.onload = function() {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//     };
// };

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
    <div id="receiptContainer" style={{padding:'30px'}} className={styles.invoice}>
      <div className={styles["invoice-container"]}>
        <div className={styles["invoice-head"]}>
          {/* <div className={styles['invoice-head-top']}>
                    
                    <div className={`${styles['invoice-head-top-right']} ${styles['text-end']}`}>
                        <h3>Invoice</h3>
                    </div>
                </div> */}
<div
  className={styles.hr}
  style={{ borderTop: '1px solid black', margin: '10px 0', width: '100%' }}
></div>
          <div className={styles["invoice-head-middle"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "200px" }}>
                <img src={logo} alt="Logo" style={{ width: "100%" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginRight: "20px",
                  }}
                >
                  <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                    Yuvatech Computers
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "100px",
                  }}
                >
                  <div style={{ margin: "5px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Date</span>: {date}
                  </div>
                  <div style={{ margin: "5px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Invoice No:</span>{" "}
                    {paymentId}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
  className={styles.hr}
  style={{ borderTop: '1px solid black', margin: '10px 0', width: '100%' }}
></div>
          <div className={styles["invoice-head-bottom"]}>
            <div className={styles["invoice-head-bottom-left"]}>
              <ul>
                <li className={styles["text-bold"]}>Invoiced To:</li>
                <li>{studentName}</li>
                <li>{address}</li>
              </ul>
            </div>
            <div className={styles["invoice-head-bottom-right"]}>
              <ul className={styles["text-end"]}>
                <li className={styles["text-bold"]}>Pay To:</li>
                <p> {fullAddress}</p>

              </ul>
            </div>
          </div>
          <div>
            {duedate}
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={{ fontWeight: "bold", padding: "13px" }}>
                  Total Fees :{" "}
                  <span style={{ fontWeight: "normal" }}>{applicableFees} </span>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    padding: "13px",
                  }}
                >
                  Pending Fees :{" "}
                  <span style={{ fontWeight: "normal" }}>{balanceAmount}</span>
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
            This is computer generated receipt and does not require physical
            signature.
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
