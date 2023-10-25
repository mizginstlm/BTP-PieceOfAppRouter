import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';

import './print.css';
import {
    Button,
    Label,
    Modals,
    Table,
    TableCell,
    TableColumn,
    TableRow,
} from '@ui5/webcomponents-react';



import { GlobalContext } from '../index';
function Print() {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [timeAccountData, setTimeAccountData] = useState({ vesting: '', remaindereBalance: '', availableBalance: '', daysUsed: '' });
    const [employeeTimeData, setEmployeeTime] = useState([]);
    const { globalLang, setGlobalLang } = useContext(GlobalContext);

    async function getData() {
        const searchParams = new URLSearchParams(document.location.search)
        var q = searchParams.get('q');

        fetchData("general/getEntity?entity=apptable&filter=externalCode eq '" + q + "'")
            .then(res => {
                setEmployeeTime(JSON.parse(res.data[0].cust_EmployeeTimeJson).employeeTimeData);
                setTimeAccountData(JSON.parse(res.data[0].cust_TimeAccountJson).timeAccountData)
            })
            .catch(error => {
            });
    }

    function getContentByLanguage(key, language) {
        if (language === 'tr') {
            switch (key) {
                case 'formContent':
                    return (<p> Sayın &nbsp; {globalState.user.defaultFullName};

                        <br /><br />
                    lorem ipsum in tr
                        <br /><br />
                    </p>);
                case 'usedDays':
                    return 'Absences';
                case 'availableBalance':
                    return 'Kalan Bakiye';
                case 'startDate':
                    return 'Başlangıç Tarihi';
                case 'endDate':
                    return 'Bitiş Tarihi';
                case 'leaveUsedDays':
                    return 'Kullanılan İzin Günü';
                case 'history':
                    return 'Tarih:';
                case 'signature':
                    return 'Çalışan İmza:';
                case 'print':
                    return 'Yazdır';
                default:
                    return '';
            }
        } else if (language === 'en') {
            switch (key) {
                case 'formContent':
                    return (<p> Dear  &nbsp; {globalState.user.defaultFullName};
                        <br /><br />
                       lorem ipsum in en
                        <br /><br />
                    </p>);
                case 'usedDays':
                    return 'Absences';
                case 'availableBalance':
                    return ' Balance';
                case 'startDate':
                    return 'Start Date';
                case 'endDate':
                    return 'End Date';
                case 'leaveUsedDays':
                    return 'Absences';
                case 'history':
                    return 'Date: ';
                case 'signature':
                    return 'Employee Signature: ';
                case 'print':
                    return 'Print';
                default:
                    return '';
            }
            console.log(key, language)
        }
    }

    const printDocument = () => {
        const buttonPrint = document.getElementById('buttonPrint');
        buttonPrint.style.visibility = 'hidden';
        const input = document.getElementById('divToPrint');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: "a4",
            fontfamily: "Calibri",
            putOnlyUsedFonts: true
        });
        html2canvas(input)

            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                pdf.addImage(imgData, 'JPEG', 0, 0, 209, 299);
                pdf.save("form.pdf");
            });

        buttonPrint.style.visibility = 'visible';
    }
    const objectStyle = {
        padding: "10px",
        opacity: 0.4,
        pointerEvents: "none"
    };
    useEffect(() => {
        getData();

    }, []);
    return (

        <>

            <div id='divToPrint' className='izinForm' >
                <div>
                    <img src={logo} alt="logo" width={174} height={63} />
                    <h4 className='ibaslik' style={{ backgroundColor: '#c41127', padding: '12px', borderRadius: '2px', color: 'white' }} >{getContentByLanguage('permissionPdfHeader', globalLang)}</h4>
                    <h4 className='ibaslik' ></h4>
                    <h4 className='ibaslik'></h4>
                    <div className="mutabakatcoloredtext" style={{ fontFamily: 'Calibri', fontSize: '13.3px' }}>
                        {getContentByLanguage('formContent', globalLang)}
                    </div>

                    <h4 style={{ backgroundColor: '#c41127', padding: '12px', borderRadius: '2px', color: 'white' }}>
                        {getContentByLanguage('annualBalanceTable', globalLang)}
                    </h4>
                    <Table

                        columns={<><TableColumn style={{ width: '12rem' }} ><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>{getContentByLanguage('transferedfrom', globalLang)}</Label></TableColumn>
                            <TableColumn style={{ width: '12rem' }}><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>{getContentByLanguage('paymentForYear', globalLang)}</Label></TableColumn>
                            <TableColumn style={{ width: '12rem' }}><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>{getContentByLanguage('usedDays', globalLang)}</Label></TableColumn>
                            <TableColumn style={{ width: '12rem' }}><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>{getContentByLanguage('availableBalance', globalLang)}</Label></TableColumn>

                        </>}
                        onLoadMore={function ka() { }}
                        onPopinChange={function ka() { }}
                        onRowClick={function ka() { }}
                        onSelectionChange={function ka() { }}
                    >
                        <TableRow>
                            <TableCell>
                                <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                    {timeAccountData.availableBalance}
                                </Label>
                            </TableCell>
                            <TableCell>
                                <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                    {timeAccountData.vesting}
                                </Label>
                            </TableCell>
                            <TableCell>
                                <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                    {timeAccountData.daysUsed}
                                </Label>
                            </TableCell>
                            <TableCell>
                                <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                    {timeAccountData.remaindereBalance}
                                </Label>
                            </TableCell>
                        </TableRow>
                    </Table>
                    <h4 style={{ backgroundColor: '#c41127', padding: '12px', borderRadius: '2px', color: 'white' }}>
                        {getContentByLanguage('permissionDetailtable', globalLang)}
                    </h4>
                    <Table
                        columns={<><TableColumn style={{ width: '12rem' }}><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>{getContentByLanguage('startDate', globalLang)}</Label></TableColumn>
                            <TableColumn style={{ width: '12rem' }}><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }} >{getContentByLanguage('endDate', globalLang)} </Label></TableColumn>
                            <TableColumn style={{ width: '12rem' }}><Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>{getContentByLanguage('leaveUsedDays', globalLang)}</Label></TableColumn>

                        </>}
                        onLoadMore={function ka() { }}
                        onPopinChange={function ka() { }}
                        onRowClick={function ka() { }}
                        onSelectionChange={function ka() { }}
                    >
                        {employeeTimeData.map((user) => {

                            return (
                                <TableRow>
                                    <TableCell>
                                        <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                            <Moment format="DD/MM/YYYY">{user.startDate}</Moment>
                                        </Label>
                                    </TableCell>
                                    <TableCell>
                                        <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                            <Moment format="DD/MM/YYYY">{user.endDate}</Moment>

                                        </Label>
                                    </TableCell>
                                    <TableCell>
                                        <Label style={{ fontFamily: 'Calibri', fontSize: '13.3px', color: 'black' }}>
                                            {user.originalQuantityInDays}
                                        </Label>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </Table>
                    <p style={{ fontFamily: 'Calibri', fontSize: '13.3px' }}>{getContentByLanguage('history', globalLang)}</p>
                    <p style={{ fontFamily: 'Calibri', fontSize: '13.3px' }}>{getContentByLanguage('signature', globalLang)}</p>
                    <div id="buttonPrint" className='footer'>
                        <Button style={{ "font-family": "Calibri" }} icon='print' onClick={printDocument} >{getContentByLanguage('print', globalLang)}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Print;




