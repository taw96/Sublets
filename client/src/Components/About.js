import React from 'react'
import Background from '../livingRoom3.jpg'

export default function About() {
  return (
    
    <div style={{backgroundImage:`url(${Background})`,height:"100vh",width:"100vw"
 }}>
    <div style={{textAlign:'center',paddingTop:'150px',direction:"rtl"}}>
    <h3>
    פלטפורמת סאבלט'ס הוקמה בשלהי 2019 עקב מעבר מקיבוץ גלילי לעיר הגדולה. <br/>
    המאמצים וחוסר השקט שנלוו לתקופה זו עקב חיפושים יומיומיים בעשרות קבוצות פייסבוק שונות,<br/>
    ללא יכולת סינון וחיפוש יעילים,
    בטח ובטח שללא הצגה נוחה של מיקום הסאבלט,<br/>
     דירבנו אותי לפתח את האפליקציה, 
     על מנת להנגיש לכולנו ברמה גבוהה ובצורה יעילה את התופעה המדהימה שנקראת סאבלט! 
     <br/>
     תהנו,
     <br/>
      תומר
    </h3>  
    </div>
    </div>
  )
}
