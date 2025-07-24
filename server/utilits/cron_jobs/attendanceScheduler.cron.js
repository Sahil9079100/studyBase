import cron from 'node-cron';
import client from '../redis.helper.js';
import { writeAttendanceToDB } from '../../services/attendanceService.service.js';

export function startAttendanceScheduler() {
    // Schedule for every 10 seconds (for testing)
    cron.schedule('*/30 * * * * *', async () => {
        console.log(`\n[ATTENDANCE CHECK SCHEDULER] Checking pending attendance at ${new Date().toISOString()}`);
        try {
            const pending = await client.lrange('attendance:pending_attendance', 0, -1);
            console.log(`--> ${pending.length} entry(ies) pending.`);

            for (const jsonString of pending) {
                try {
                    const data = JSON.parse(jsonString);
                    // console.log(data)
                    const updated = await writeAttendanceToDB(data);
                    console.log(`[SCHEDULE UPDATE] Attendance updated for class ${data.classId} [${data.subjectName}], count: ${updated}`);
                } catch (err) {
                    console.error('[SCHEDULE UPDATE] Failed to write one attendance record:', err);
                }
            }

            if (pending.length > 0) {
                await client.del('attendance:pending_attendance');
                console.log('[SCHEDULEUPDATE] Cleared processed attendance queue.');
            }

        } catch (err) {
            console.error('Scheduler error fetching attendance:', err);
        }
    });
}
