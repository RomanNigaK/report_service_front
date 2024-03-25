import { Report } from "redux/slices/report/slice";

type ReportItemProps = {
  openDetails: (id: Report, readOnly: boolean) => void;
  report: Report;
};

export default function ReportItem({ openDetails, report }: ReportItemProps) {
  const handleOpenReportList = () => {
    const ms = new Date(Date.now());

    const d2 = `${ms.getFullYear()}-${
      ms.getMonth() > 9 ? ms.getMonth() + 1 : "0" + (ms.getMonth() + 1)
    }`;

    const dt = report.date.date.split(" ")[0].split("-").slice(0, 2).join("-");

  
    const isCurrentMonth = dt !== d2;
    
    openDetails(report, isCurrentMonth);
  };
  return (
    <div
      className="table-report__row"
      key={report.id}
      onClick={handleOpenReportList}
    >
      <div className="table-report__item">{`№-${report.ordering}`}</div>
      <div className="table-report__item">{report.date.date.split(" ")[0]}</div>
      <div className="table-report__item sum">{report.sum} <small>&#8381;</small></div>
      <div className="table-report__item author">{report.author}</div>
      <div className="table-report__item">{report.amountRow}</div>
    </div>
  );
}
