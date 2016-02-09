<div class="row">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading">Sample Admin Page</div>
			<div class="panel-body">
				<form role="form" class="points-settings">
					<p>
						Adjust these settings. You can then retrieve these settings in code via:
						<code>meta.settings.get('points');</code>
					</p>
					<div class="form-group">
						<label for="setting-1">Post weight</label>
						<input type="text" id="postWeight" name="postWeight" title="Setting 1" class="form-control" placeholder="Setting 1">
					</div>
					<div class="form-group">
						<label for="setting-2">Topic weight</label>
						<input type="text" id="topicWeight" name="topicWeight" title="Setting 2" class="form-control" placeholder="Setting 2">
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>
