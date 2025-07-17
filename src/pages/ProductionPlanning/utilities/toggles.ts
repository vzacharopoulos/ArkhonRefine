
  /*const handleStart = async (order: PPOrder) => {
    if (!order.pporderno) return;

    try {
      const response = await client.request<any>(
        print(GET_PPORDERLINES_OF_PPORDER),
        {
          filter: { ppordernos: order.pporderno },
        }
      );
      const pporderlines2: PPOrderLine[] = response?.pporderlines2 ?? [];

      const totalMinutes = pporderlines2.reduce(
        (sum: number, line: PPOrderLine) => sum + (line.prodOrdersView?.time ?? 0),
        0
      );

      const start = dayjs();

      // Determine previous finished order end time
      const lastFinished = [...finished]
        .filter(f => f.finishDateDatetime)
        .sort((a, b) =>
          dayjs(a.finishDateDatetime as Date).diff(dayjs(b.finishDateDatetime as Date))
        )
        .pop();

      const offStart = lastFinished?.finishDateDatetime
        ? dayjs(lastFinished.finishDateDatetime as Date)
        : null;
      const offEnd = start.clone();
      const offDuration = offStart
        ? calculateWorkingMinutesBetween(
            offStart,
            offEnd,
            dailyWorkingHours,
            defaultWorkingHours
          )
        : 0;

      const finish = addWorkingMinutesDynamic(
        start,
        totalMinutes,
        dailyWorkingHours,
        defaultWorkingHours
      );

      await updatePporder({
        resource: "pporders",
        id: order.id,
        values: {
          startDateDatetime: start.toISOString(),
          estStartDate: start.toISOString(),
          finishDateDatetime: finish.toISOString(),
          estFinishDate: finish.toISOString(),
          offtimestartdate: offStart ? offStart.toISOString() : null,
          offtimeenddate: offEnd.toISOString(),
          offtimeduration: offDuration,
          status: 2,
        },
        meta: { gqlMutation: UPDATE_PPORDERS },
      });

      // Build calendar events using working-hour split
      const offSegments = offDuration && offStart
        ? splitEventIntoWorkingHours(
            offStart,
            offDuration,
            dailyWorkingHours,
            defaultWorkingHours,
            {
              id: `${order.id}-offtime`,
              title: "προετοιμασία μηχανής",
              color: "gray",
              extendedProps: {
                isOfftime: true,
                currId: order.id.toString(),
                offtimeduration: offDuration,
                offtimeStartDate: offStart.toISOString(),
                offtimeEndDate: offEnd.toISOString(),
              },
            }
          )
        : [];

      const jobSegments = splitEventIntoWorkingHours(
        start,
        totalMinutes,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: String(order.id),
          title: `${order.pporderno} - ${order.panelcode}`,
          color: statusColorMap[2] || "gray",
          extendedProps: {
            panelcode: order.panelcode,
            status: 2,
            tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}\nκατάσταση: ${
              STATUS_MAP[2] || "Άγνωστη"
            }`,
          },
        }
      );

      setCurrentEvents(prev => [...prev, ...offSegments, ...jobSegments]);
    } catch (error) {
      console.error("Failed to start order", error);
    }
  };

  const handleStartEvent = async (eventsArg?: EventInput[]) => {
      const rawEvents = eventsArg ?? currentEvents;
  
      if (!eventsArg&&rawEvents  !== currentEvents) {
        setCurrentEvents(rawEvents);
      }
  
      const grouped: Record<string, EventInput[]> = {};
      const offInfo: Record<string, Partial<PPOrder>> = {};
  
      // Process all events and group them (similar to handleDrop logic)
      rawEvents.forEach(ev => {
        if (!ev.id || !ev.start || !ev.end) return;
   
        const idStr = ev.id.toString();
        
        // Handle offtime events - use the already split segments from handleDrop
        if (ev.extendedProps?.isOfftime) {
          const currId = ev.extendedProps.currId;
          const strPrevId = ev.extendedProps.prevId?.toString();
          const prevId = strPrevId?.split('-part-')[0];
          const prevPanelCode = ev.extendedProps.prevpanelcode;
  
          if (currId) {
            console.log("currId", currId);
            const currIdStr = currId.toString();
  
            // If this is the first offtime segment for this currId, initialize offInfo
            if (!offInfo[currIdStr]) {
              offInfo[currIdStr] = {
                previd: Number(prevId),
                prevpanelcode: prevPanelCode,
                offtimeduration: ev.extendedProps.offtimeduration,
                // Use the individual segment's start/end from extendedProps (set by handleDrop)
                offtimestartdate: ev.extendedProps.offtimeStartDate
                  ? new Date(ev.extendedProps.offtimeStartDate)
                  : new Date(ev.start as Date),
                offtimeenddate: ev.extendedProps.offtimeEndDate
                  ? new Date(ev.extendedProps.offtimeEndDate)
                  : new Date(ev.end as Date),
              };
            } else {
              // Update the end date if this segment ends later
              const currentEnd = new Date(ev.extendedProps.offtimeEndDate || ev.end as Date);
              const existingEnd = offInfo[currIdStr].offtimeenddate;
              if (existingEnd && currentEnd > existingEnd) {
                offInfo[currIdStr].offtimeenddate = currentEnd;
              }
            }
          }
          return;
        }
  
        // Handle regular events - extract base ID (same as before)
        const baseId = idStr.includes('-part-') ? idStr.split('-part-')[0] : idStr;
  
        // Only process events with status 1, 2, 3, or 14
        const eventStatus = ev.extendedProps?.status;
        if (eventStatus && [1, 2, 3, 14].includes(eventStatus)) {
          if (!grouped[baseId]) {
            grouped[baseId] = [];
          }
          grouped[baseId].push(ev);
        }
  
        function getEventProperties(ev:EventInput) {
          return {
            id: String(ev.id),
            title: `${ev.pporderno} - ${ev.panelcode}`,
            start: ev.start,
            end: ev.end,
            color: statusColorMap[ev.status ?? 0] || "gray",
            extendedProps: {
              panelcode: ev.panelcode,
              status: ev.status,
              tooltip: `${ev.pporderno ?? ""} - ${ev.panelcode ?? ""}\nκατάσταση: ${STATUS_MAP[ev.status || 0] || "Άγνωστη"}`,
            }
          };
        }
        const teststart = dayjs(ev.start as Date);
  
  console.log("totalMinutes",totalMinutes)
  console.log("teststart",teststart)
  
        // Then use it like this:
        const testsegments = splitEventIntoWorkingHours(
          teststart,
          totalMinutes,
          dailyWorkingHours,
          defaultWorkingHours,
          getEventProperties(ev)
        );
        console.log("testsegments.end",testsegments.entries)
        const testfinish = dayjs(testsegments[testsegments.length - 1].end as Date);
  
        console.log("start", teststart, "-", "finish", testfinish)
      });
  
      console.log('test Grouped events:', Object.keys(grouped));
      console.log('test OffInfo:', offInfo);
  
    };*/