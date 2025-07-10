// EditEventModal.tsx
import React from "react";
import { Modal, Button, Card, Typography, Divider, Space } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Dayjs } from "dayjs";
import { EventInput } from "@fullcalendar/core";
import { TimeInput } from "./timepicker";
import { StatusTag } from "@/utilities";

// Initialize dayjs plugins
dayjs.extend(duration);

const { Text, Title } = Typography;

// Helper function to safely parse dates from EventInput
const parseEventDate = (date: EventInput['start'] | EventInput['end']): Dayjs | null => {
  if (!date) return null;
  if (typeof date === 'string' || typeof date === 'number' || date instanceof Date) {
    return dayjs(date);
  }
  // Handle other cases (like allDay events or custom formats)
  return null;
};

interface EditEventModalProps {
  open: boolean;
  event: EventInput | null;
  editStart: Dayjs | null;
  editEnd: Dayjs | null;
  onCancel: () => void;
  onDelete: () => void;
  onSave: () => void;
  onChangeStart: (time: Dayjs) => void;
  onChangeEnd: (time: Dayjs) => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  event,
  editStart,
  editEnd,
  onCancel,
  onDelete,
  onSave,
  onChangeStart,
  onChangeEnd,
}) => {
  // Safely parse the event dates
  const eventStart = event ? parseEventDate(event.start) : null;
  const eventEnd = event ? parseEventDate(event.end) : null;

  return (
    <Modal
      open={open}
      title="Επεξεργασία Συμβάντος"
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="delete" danger onClick={onDelete}>
          Διαγραφή
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Άκυρο
        </Button>,
        <Button key="submit" type="primary" onClick={onSave}>
          Αποθήκευση
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Event Details Card */}
      <Card 
  title="Λεπτομέρειες Συμβάντος" 
  style={{ 
    flex: 3, 
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '500px', // Set a maximum height for the card
  }}
 
  styles={{body:{
    overflowY: 'auto', // Enable vertical scrolling
    flexGrow: 1, // Allow body to grow and take remaining space
    padding: '16px' // Maintain padding
  },
  header:{ 
    backgroundColor: '#f0f2f5', 
    borderBottom: 0,
    flexShrink: 0 // Prevent header from shrinking
  

  }}}
>
  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
    {/* Your existing content */}
            <div>
              <Text strong>Τίτλος:</Text>
              <Text style={{ display: 'block' }}>{event?.title || 'N/A'}</Text>
            </div>

            {event?.extendedProps?.status && (
              <div>
                <Text strong>Κατάσταση:</Text>
                <StatusTag status={event?.extendedProps?.status} />
              </div>
            )}

            {event?.extendedProps?.totalMeter && (
              <div>
                <Text strong>Συνολικό Μήκος:</Text>
                <Text style={{ display: 'block' }}>
                  {event.extendedProps.totalMeter.toFixed(2)} m
                </Text>
              </div>
            )}

            {event?.extendedProps?.speed && (
              <div>
                <Text strong>Ταχύτητα:</Text>
                <Text style={{ display: 'block' }}>
                  {event.extendedProps.speed} m/min
                </Text>
              </div>
            )}

            <Divider style={{ margin: '2px 0' }} />

            <div>
              <Text strong>Εκτιμώμενη Έναρξη:</Text>
              <Text style={{ display: 'block' }}>
                {eventStart ? eventStart.format('YYYY-MM-DD HH:mm') : 'N/A'}
              </Text>
            </div>

            <div>
              <Text strong>Εκτιμώμενη Λήξη:</Text>
              <Text style={{ display: 'block' }}>
                {eventEnd ? eventEnd.format('YYYY-MM-DD HH:mm') : 'N/A'}
              </Text>
            </div>
          </Space>
        </Card>

        {/* Time Picker Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Title level={5} style={{ marginBottom: 0 }}>Επεξεργασία Χρόνου</Title>
          <TimeInput 
            label="Νέα ώρα έναρξης:" 
            time={editStart} 
            onChange={onChangeStart} 
          />
          <TimeInput 
            label="Νέα ώρα λήξης:" 
            time={editEnd} 
            onChange={onChangeEnd} 
          />
          <div style={{ marginTop: 'auto' }}>
              <Text strong>θεωρητική διάρκεια:</Text>
              <Text style={{ display: 'block' }}>
                {dayjs.duration(event?.extendedProps?.duration, 'minutes').format('HH:mm')} ώρες
              </Text>
            </div>

          {editStart && editEnd && (
            <div style={{ marginTop: 'auto' }}>
              <Text strong>Διάρκεια για σήμερα:</Text>
              <Text style={{ display: 'block' }}>
                {dayjs.duration(editEnd.diff(editStart)).format('HH:mm')} ώρες
              </Text>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};