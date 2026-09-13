function readStore(key){try{return JSON.parse(localStorage.getItem(key))||[]}catch{return[]}}
function normaliseBooking(b){return {...b,requestID:b.requestID||b.id||'EVT-UNKNOWN',name:b.name||'Customer',phone:b.phone||'',email:b.email||'',eventType:b.eventType||b.event||'Event',eventDate:b.eventDate||b.date||'',location:b.location||'',guests:Number(b.guests||0),staffNeeded:Number(b.staffNeeded||b.maleStaff||0)+Number(b.staffNeeded?0:b.femaleStaff||0),notes:b.notes||b.message||'',status:b.status||'Pending',assignedStaff:Array.isArray(b.assignedStaff)?b.assignedStaff:[],paymentStatus:b.paymentStatus||'Unpaid',amount:Number(b.amount||b.budget||0),createdAt:b.createdAt||new Date(0).toISOString()}}
function getBookings(){return readStore('bookings').map(normaliseBooking)}
function saveBookings(bookings){localStorage.setItem('bookings',JSON.stringify(bookings.map(normaliseBooking)))}
function getStaff(){return readStore('staff').map((s,i)=>({...s,id:s.id||`STF-OLD-${i}`,name:s.name||'Unnamed staff',role:s.role||'Staff',phone:s.phone||'',availability:s.availability||'Available'}))}
function saveStaff(staff){localStorage.setItem('staff',JSON.stringify(staff))}
function findBooking(id){return getBookings().find(b=>b.requestID.toUpperCase()===String(id).trim().toUpperCase())}
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function statusClass(status){return String(status).toLowerCase()}
