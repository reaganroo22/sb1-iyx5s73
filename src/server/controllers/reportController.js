import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
export const createReport = asyncHandler(async (req, res) => {
  const { reportedUserId, reason, description } = req.body;
  const reporterId = req.user.id;

  const { data, error } = await supabase
    .rpc('report_user', {
      p_reporter_id: reporterId,
      p_reported_user_id: reportedUserId,
      p_reason: reason,
      p_description: description
    });

  if (error) throw new Error(error.message);

  res.status(201).json({ reportId: data, message: 'Report submitted successfully' });
});

// @desc    Get all reports (admin only)
// @route   GET /api/reports
// @access  Private/Admin
export const getReports = asyncHandler(async (req, res) => {
  // Note: Implement admin check middleware before using this route

  const { data: reports, error } = await supabase
    .from('reports')
    .select(`
      *,
      reporter:reporter_id (id, email),
      reported_user:reported_user_id (id, email)
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  res.json(reports);
});

// @desc    Update report status (admin only)
// @route   PUT /api/reports/:id
// @access  Private/Admin
export const updateReportStatus = asyncHandler(async (req, res) => {
  // Note: Implement admin check middleware before using this route
  const { id } = req.params;
  const { status } = req.body;

  const { data, error } = await supabase
    .from('reports')
    .update({ status })
    .eq('id', id);

  if (error) throw new Error(error.message);

  res.json({ message: 'Report status updated successfully' });
});