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
						<input type="number" id="postWeight" name="postWeight" title="Setting 1" class="form-control" placeholder="Setting 1">
					</div>
					<div class="form-group">
						<label for="setting-2">Topic weight</label>
						<input type="number" id="topicWeight" name="topicWeight" title="Setting 2" class="form-control" placeholder="Setting 2">
					</div>
					<div class="form-group">
						<label for="upvoteWeight">Upvote weight</label>
						<input type="number" id="upvoteWeight" name="upvoteWeight" title="upvoteWeight" class="form-control" placeholder="0">
					</div>
					<label style="width: 20%;">Rank</label>
					<label style="width: 20%;">Points</label>

					<div class="form-group">
							<input class="md-col-2" id="rankTitle1" name="rankTitle1" title="rankTitle1" data-key="rankTitle1" type="text" class="form-control"/>
							<input class="md-col-2" id="rankPoints1" name="rankPoints1" title="rankPoints1" data-key="rankPoints1" type="number" class="form-controll" />
					</div>
					<div class="form-group">
							<input class="md-col-2" id="rankTitle2" name="rankTitle2" title="rankTitle2" data-key="rankTitle2" type="text" class="form-control"/>
							<input class="md-col-2" id="rankPoints2" name="rankPoints2" title="rankPoints2" data-key="rankPoints2" type="number" class="form-controll" />
					</div>
					<div class="form-group">
							<input class="md-col-2" id="rankTitle3" name="rankTitle3" title="rankTitle3" data-key="rankTitle3" type="text" class="form-control"/>
							<input class="md-col-2" id="rankPoints3" name="rankPoints3" title="rankPoints3" data-key="rankPoints3" type="number" class="form-controll" />
					</div>
					<div class="form-group">
							<input class="md-col-2" id="rankTitle4" name="rankTitle4" title="rankTitle4" data-key="rankTitle4" type="text" class="form-control"/>
							<input class="md-col-2" id="rankPoints4" name="rankPoints4" title="rankPoints4" data-key="rankPoints4" type="number" class="form-controll" />
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
