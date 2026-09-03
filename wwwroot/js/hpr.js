const steps = ['Professional Profile', 'Identity & Contact', 'Professional License', 'Qualifications', 'Employment & Practice', 'Digital Identity & Consent', 'Documents', 'Review & Submit'];
let cur = 0;
let tickets = [{ id: 'QNDHM-TKT-2026-0112', reg: 'PRO-2026-00125', subject: 'Sandbox authentication support', category: 'Integration', priority: 'High', status: 'Open', agent: 'Integration Support', sla: 'Within SLA', owner: 'registrant', events: [{ title: 'Ticket Created', date: '28 Aug 2026', note: 'Ticket generated through QNDHM portal' }, { title: 'Assigned', date: '28 Aug 2026', note: 'Assigned to Integration Support' }] }, { id: 'QNDHM-TKT-2026-0098', reg: 'PRO-2026-00125', subject: 'Additional authorization document required', category: 'Documents', priority: 'Medium', status: 'Resolved', agent: 'Registration Support', sla: 'Met', owner: 'registrant', events: [{ title: 'Ticket Created', date: '24 Aug 2026', note: 'Document request raised' }, { title: 'Resolved', date: '25 Aug 2026', note: 'Required document received and reviewed' }] }, { id: 'QNDHM-TKT-2026-0074', reg: 'OTHER-2026-00044', subject: 'Compliance observation clarification', category: 'Compliance', priority: 'Low', status: 'In Progress', agent: 'Compliance Team', sla: 'Within SLA', owner: 'other', events: [{ title: 'Ticket Created', date: '20 Aug 2026', note: 'Compliance clarification requested' }] }];
function showView(v) { document.getElementById('registrationView').classList.toggle('active', v === 'registration'); document.getElementById('supportView').classList.toggle('active', v === 'support'); document.getElementById('navRegistration').classList.toggle('active', v === 'registration'); document.getElementById('navSupport').classList.toggle('active', v === 'support'); document.getElementById('formFooter').classList.toggle('hidden', v === 'support'); if (v === 'support') renderTickets() }
// function showStep(i) { cur = Math.max(0, Math.min(i, steps.length - 1)); document.querySelectorAll('.tab').forEach(x => x.classList.remove('active')); document.getElementById('t' + cur).classList.add('active'); document.querySelectorAll('.step').forEach((x, j) => x.classList.toggle('active', j === cur)); document.getElementById('stepTitle').textContent = steps[cur]; document.getElementById('bar').style.width = ((cur + 1) / steps.length * 100) + '%'; scrollTo(0, 0) } function move(d) { showStep(cur + d) } function saveDraft() { let n = new Date().toLocaleString(); localStorage.setItem('QNDHM_Healthcare_Professional_Role_Based.html', n); document.getElementById('saved').textContent = 'Saved locally: ' + n }
function showStep(i) {
    cur = Math.max(0, Math.min(i, steps.length - 1));

    // Show current tab
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.getElementById('t' + cur).classList.add('active');

    // Update step navigation
    document.querySelectorAll('.step').forEach((x, j) => {
        x.classList.remove('active', 'completed');

        const num = x.querySelector('.num');

        if (j < cur) {
            // Completed steps
            x.classList.add('completed');
            num.textContent = '✓';
        }
        else if (j === cur) {
            // Current step
            x.classList.add('active');
            num.textContent = j + 1;
        }
        else {
            // Future steps
            num.textContent = j + 1;
        }
    });

    // Update title and progress
    document.getElementById('stepTitle').textContent = steps[cur];
    document.getElementById('bar').style.width =
        ((cur + 1) / steps.length * 100) + '%';

    scrollTo(0, 0);
}

function applyRole() { let role = document.getElementById('role').value; document.querySelectorAll('[data-admin-only]').forEach(x => x.classList.toggle('hidden', role !== 'admin')); document.querySelectorAll('[data-role-field="agent"]').forEach(x => x.classList.toggle('hidden', role === 'registrant')); let p = { registrant: 'Create tickets and view tickets linked to own registration. Cannot assign agents or close tickets.', support: 'View assigned tickets, update status, add response and resolution notes.', reviewer: 'Read-only access to registration and complete support history.', admin: 'Full access to all tickets, reassignment, escalation, status closure and role management.' }; document.getElementById('permissions').textContent = p[role]; document.getElementById('supportScope').textContent = role === 'registrant' ? 'Tickets linked to this registration only' : 'All tickets permitted for ' + role; renderTickets() }
function renderTickets() { let role = document.getElementById('role').value, q = (document.getElementById('ticketSearch')?.value || '').toLowerCase(), st = document.getElementById('ticketStatus')?.value || '', pr = document.getElementById('ticketPriority')?.value || '', cat = document.getElementById('ticketCategory')?.value || ''; let data = tickets.filter(t => (role !== 'registrant' || t.owner === 'registrant') && (!q || Object.values(t).join(' ').toLowerCase().includes(q)) && (!st || t.status === st) && (!pr || t.priority === pr) && (!cat || t.category === cat)); document.getElementById('ticketRows').innerHTML = data.map(t => `<tr><td>${t.id}</td><td>${t.reg}</td><td>${t.subject}</td><td>${t.category}</td><td><span class="pill ${t.priority === 'High' ? 'red' : t.priority === 'Medium' ? 'amber' : 'blue'}">${t.priority}</span></td><td><span class="pill ${t.status === 'Resolved' || t.status === 'Closed' ? 'green' : t.status === 'Open' ? 'red' : 'blue'}">${t.status}</span></td><td>${t.agent}</td><td>${t.sla}</td><td><button class="btn light" onclick="trackTicket('${t.id}')">Track</button></td></tr>`).join('') }
function filterTickets() { renderTickets() } function resetTickets() { ['ticketSearch', 'ticketStatus', 'ticketPriority', 'ticketCategory'].forEach(i => document.getElementById(i).value = ''); renderTickets() } function newTicket() { showTicketSection('new'); prepareNewTicket(); return; document.getElementById('fTicket').value = 'QNDHM-TKT-2026-' + String(120 + tickets.length); document.getElementById('fSubject').value = '' } function loadTicket(id) { let t = tickets.find(x => x.id === id); if (!t) return; fTicket.value = t.id; fReg.value = t.reg; fSubject.value = t.subject; fCategory.value = t.category; fPriority.value = t.priority; fStatus.value = t.status; fAgent.value = t.agent } function saveTicket() { let existing = tickets.find(x => x.id === fTicket.value); let obj = { id: fTicket.value, reg: fReg.value, subject: fSubject.value, category: fCategory.value, priority: fPriority.value, status: fStatus.value, agent: fAgent.value, sla: 'Within SLA', owner: 'registrant', events: [{ title: 'Ticket Created', date: '28 Aug 2026', note: 'Ticket generated through QNDHM portal' }, { title: 'Assigned', date: '28 Aug 2026', note: 'Assigned to Integration Support' }] }; if (existing) Object.assign(existing, obj); else tickets.unshift(obj); renderTickets(); alert('Ticket saved') } let trackedTicket = null;
function showTicketSection(which) { document.getElementById('ticketTrackSection').classList.toggle('hidden', which !== 'track'); document.getElementById('ticketNewSection').classList.toggle('hidden', which !== 'new'); document.getElementById('ticketTimelineSection').classList.toggle('hidden', which !== 'timeline'); document.getElementById('ttTrack').classList.toggle('active', which === 'track' || which === 'timeline'); document.getElementById('ttNew').classList.toggle('active', which === 'new'); if (which === 'new') prepareNewTicket(); if (which === 'track') renderTickets() }
function prepareNewTicket() { document.getElementById('nTicket').value = 'QNDHM-TKT-' + new Date().getFullYear() + '-' + String(1000 + tickets.length + 1).padStart(4, '0') }
function clearNewTicket() { ['nReg', 'nSubject', 'nEmail', 'nMobile', 'nDescription', 'nAttachment'].forEach(x => document.getElementById(x).value = ''); prepareNewTicket() }
function generateTicket() { let reg = nReg.value.trim(), subject = nSubject.value.trim(), desc = nDescription.value.trim(); if (!reg || !subject || !desc) { alert('Registration ID, subject and issue description are required'); return } let now = new Date().toLocaleString(); let obj = { id: nTicket.value, reg: reg, subject: subject, category: nCategory.value.replace('Sandbox / API', 'Integration'), priority: nPriority.value, status: 'Open', agent: 'Unassigned', sla: 'SLA Started', owner: 'registrant', events: [{ title: 'Ticket Created', date: now, note: desc }] }; tickets.unshift(obj); let id = obj.id; clearNewTicket(); renderTickets(); showTicketSection('track'); alert('New ticket generated: ' + id) }
function trackTicket(id) { trackedTicket = tickets.find(x => x.id === id); if (!trackedTicket) return; timelineTitle.textContent = trackedTicket.id + ' - ' + trackedTicket.subject; timelineSub.textContent = 'Registration ID: ' + trackedTicket.reg + ' | Category: ' + trackedTicket.category + ' | Priority: ' + trackedTicket.priority; trackStatus.value = trackedTicket.status; trackAgent.value = trackedTicket.agent; trackSla.value = trackedTicket.sla; renderTimeline(); showTicketSection('timeline') }
function renderTimeline() { timelineBox.innerHTML = (trackedTicket.events || []).map(e => `<div class="timeline-item"><b>${e.title}</b><small>${e.date}</small><div>${e.note}</div></div>`).join('') }
function addTrackingComment() { let text = trackComment.value.trim(); if (!trackedTicket || !text) return; trackedTicket.events.push({ title: 'Comment Added', date: new Date().toLocaleString(), note: text }); trackComment.value = ''; renderTimeline() }
applyRole(); showStep(0);
const documentTypes = [
    'Identity', 'Professional', 'Degree', 'Experience', 'Photograph', 'Authorization'
];

documentTypes.forEach(function (id) {
    const input = document.getElementById(id);
    const link = document.getElementById(id + 'Link');

    input.addEventListener('change', function () {
        if (this.files && this.files.length > 0) {
            const file = this.files[0];
            const fileUrl = URL.createObjectURL(file);

            link.href = fileUrl;
            link.target = '_blank';
            link.style.display = 'flex';
        }
    });
});